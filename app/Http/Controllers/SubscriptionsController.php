<?php

namespace App\Http\Controllers;

use App\Http\Requests\Subscriptions\StoreSubscriptionRequest;
use App\Http\Requests\Subscriptions\UpdateSubscriptionRequest;
use App\Models\Subscription;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class SubscriptionsController extends Controller
{
    public function index(): JsonResponse
    {
        return new JsonResponse(Subscription::withTrashed()->get(), Response::HTTP_OK);
    }

    public function store(StoreSubscriptionRequest $request): JsonResponse
    {
        $validated = $request->validated();
        $subscription = Subscription::create($validated);
        $subscription->load('company');

        return new JsonResponse($subscription, Response::HTTP_CREATED);
    }

    public function show(Subscription $subscription): JsonResponse
    {
        $subscription->load('company');

        return new JsonResponse($subscription, Response::HTTP_OK);
    }

    public function update(Subscription $subscription, UpdateSubscriptionRequest $request): JsonResponse
    {
        $validated = $request->validated();
        $subscription->update($validated);
        $subscription->load('company');

        return new JsonResponse($subscription, Response::HTTP_CREATED);
    }

    public function destroy(Subscription $subscription): JsonResponse
    {
        // Should we allow to delete a subscription if it has active members?
//        if($subscription->users()->count() > 0) {
//            return new JsonResponse('The subscription has active members', Response::HTTP_FORBIDDEN);
//        }

        $subscription->delete();

        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }

    public function restore(Subscription $subscription): JsonResponse
    {
        $subscription->restore();
        $subscription->load('company');

        return new JsonResponse($subscription, Response::HTTP_OK);
    }
}
