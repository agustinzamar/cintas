<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\StoreUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Models\User;
use App\Services\UsersService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class UsersController extends Controller
{
    public function index(): JsonResponse
    {
        return new JsonResponse(User::orderBy('company_id')->withTrashed()->get(), Response::HTTP_OK);
    }

    public function store(StoreUserRequest $request): JsonResponse
    {
        $validated = $request->validated();
        $temporalPass = Str::random();
        $validated['password'] = $temporalPass;
        $user = User::create($validated);

        UsersService::sendWelcomeEmail($user, $temporalPass);

        return new JsonResponse($user, Response::HTTP_CREATED);
    }

    public function show(User $user): JsonResponse
    {
        return new JsonResponse($user, Response::HTTP_OK);
    }

    public function update(UpdateUserRequest $request, User $user): JsonResponse
    {
        $validated = $request->validated();
        $user->update($validated);

        return new JsonResponse($user, Response::HTTP_OK);
    }

    public function destroy(User $user): JsonResponse
    {
        $user->delete();

        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }

    public function enable(User $user): JsonResponse
    {
        $user->restore();

        return new JsonResponse($user, Response::HTTP_OK);
    }
}
