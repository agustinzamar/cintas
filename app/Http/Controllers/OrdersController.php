<?php

namespace App\Http\Controllers;

use App\Enums\OrderStatusEnum;
use App\Enums\RoleEnum;
use App\Http\Requests\Orders\StoreOrderRequest;
use App\Http\Requests\Orders\UpdateOrderRequest;
use App\Http\Requests\Orders\UpdateOrderStatusRequest;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class OrdersController extends Controller
{
    public function index(): JsonResponse
    {
        /** @var User $user */
        $user = auth()->user();
        $role = $user->role_id;

        switch ($role) {
            case RoleEnum::SUPERADMIN:
            case RoleEnum::ADMINISTRATOR:
                return new JsonResponse(Order::all(), Response::HTTP_OK);
            case RoleEnum::WHAREHOUSE_MANAGER:
                return new JsonResponse(Order::where('order_status_id', OrderStatusEnum::SUBMITTED)->get(), Response::HTTP_OK);
            case RoleEnum::MANAGER:
                $orders = Order::where('company_id', $user->company_id)->whereIn('order_status_id', [OrderStatusEnum::DRAFT, OrderStatusEnum::CANCELLED])->get();
                return new JsonResponse($orders, Response::HTTP_OK);
        }

        return new JsonResponse(Order::all(), Response::HTTP_OK);
    }

    public function store(StoreOrderRequest $request): JsonResponse
    {
        $validated = $request->validated();

        /** @var User $user */
        $user = auth()->user();

        $order = Order::create([
            'order_status_id' => $validated['order_status_id'] ?? OrderStatusEnum::DRAFT,
            'user_id' => $user->id,
            'company_id' => $validated['company_id'] ?? $user->company_id,
        ]);

        $requestItems = $this->getRequestItems($validated['items'], $order->id);
        $order->items()->saveMany($requestItems);
        $order->load(['items', 'status']);

        return new JsonResponse($order, Response::HTTP_CREATED);
    }

    public function show(Order $order): JsonResponse
    {
        return new JsonResponse($order, Response::HTTP_OK);
    }

    public function update(UpdateOrderRequest $request, Order $order): JsonResponse
    {
        if (!$order->canBeEdited()) {
            return new JsonResponse('El pedido ya fue enviado y no puede ser modificado.', Response::HTTP_BAD_REQUEST);
        }


        $validated = $request->validated();

        $existingIds = array_map(function ($item) {
            return $item['id'] ?? null;
        }, $validated['items']);
        $existingIds = array_values(array_filter($existingIds));


        // Delete items that are not in the request anymore
        $order->items()->whereNotIn('id', $existingIds)->delete();

        // Update existing items
        $order->items()->whereIn('id', $existingIds)->get()->each(function (OrderItem $item) use ($validated) {
            $updatedItem = collect($validated['items'])->firstWhere('id', $item->id);
            $item->update($updatedItem);
        });

        // Insert new items
        $newItems = array_filter($validated['items'], function ($item) {
            return !isset($item['id']);
        });
        $requestItems = $this->getRequestItems($newItems, $order->id);
        $order->items()->saveMany($requestItems);


        $order->update(['order_status_id' => $validated['order_status_id']]);
        $order->load(['items', 'status']);

        return new JsonResponse($order, Response::HTTP_OK);
    }

    public function destroy(Order $order): JsonResponse
    {
        $order->delete();
        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }

    public function updateStatus(UpdateOrderStatusRequest $request, Order $order): JsonResponse
    {
        $validated = $request->validated();
        $order->update(['order_status_id' => $validated['order_status_id']]);
        return new JsonResponse($order, Response::HTTP_OK);
    }

    private function getRequestItems(array $items, string $orderId): array
    {
        $requestItems = [];
        foreach ($items as $item) {
            $item['order_id'] = $orderId;
            $requestItems[] = OrderItem::create($item);
        }
        return $requestItems;
    }
}
