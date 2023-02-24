<?php

namespace App\Http\Controllers;

use App\Http\Requests\Request\StoreRequestRequest;
use App\Http\Requests\Request\UpdateRequestRequest;
use App\Http\Requests\Request\UpdateRequestStatusRequest;
use App\Models\Request;
use App\Models\RequestItem;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class RequestsController extends Controller
{
    public function index(): JsonResponse
    {
        return new JsonResponse(Request::all(), Response::HTTP_OK);
    }

    public function store(StoreRequestRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $request = Request::create([
            'request_status_id' => $validated['request_status_id'],
            'user_id' => auth()->user()->id,
            'company_id' => auth()->user()->company_id,
        ]);

        $requestItems = $this->getRequestItems($validated['items'], $request->id);
        $request->items()->saveMany($requestItems);
        $request->load(['items', 'status']);

        return new JsonResponse($request, Response::HTTP_CREATED);
    }

    public function show(Request $request): JsonResponse
    {
        return new JsonResponse($request, Response::HTTP_OK);
    }

    public function update(UpdateRequestRequest $httpRequest, Request $request): JsonResponse
    {
        $validated = $httpRequest->validated();

        $existingIds = array_map(function ($item) {
            return $item['id'] ?? null;
        }, $validated['items']);
        $existingIds = array_values(array_filter($existingIds));


        // Delete items that are not in the request anymore
        $request->items()->whereNotIn('id', $existingIds)->delete();

        // Update existing items
        $request->items()->whereIn('id', $existingIds)->get()->each(function (RequestItem $item) use ($validated) {
            $updatedItem = collect($validated['items'])->firstWhere('id', $item->id);
            $item->update($updatedItem);
        });

        // Insert new items
        $newItems = array_filter($validated['items'], function ($item) {
            return !isset($item['id']);
        });
        $requestItems = $this->getRequestItems($newItems, $request->id);
        $request->items()->saveMany($requestItems);


        $request->update(['request_status_id' => $validated['request_status_id']]);
        $request->load(['items', 'status']);

        return new JsonResponse($request, Response::HTTP_OK);
    }

    public function destroy(Request $request): JsonResponse
    {
        $request->delete();
        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }

    public function updateStatus(UpdateRequestStatusRequest $httpRequest, Request $request): JsonResponse
    {
        $validated = $httpRequest->validated();
        $request->update(['status_id' => $validated['status_id']]);
        return new JsonResponse($request, Response::HTTP_OK);
    }

    private function getRequestItems(array $items, string $requestId): array
    {
        $requestItems = [];
        foreach ($items as $item) {
            $item['request_id'] = $requestId;
            $requestItems[] = RequestItem::create($item);
        }
        return $requestItems;
    }
}
