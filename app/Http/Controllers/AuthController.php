<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\ForgotPasswordRequest;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Requests\Auth\ResetPasswordRequest;
use App\Models\User;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    public function register(RegisterRequest $request): JsonResponse
    {
        $validated = $request->validated();
        $user = User::create($validated);

        $token = $user->createToken(config('app.name'))->plainTextToken;
        $user->load('role');

        return new JsonResponse([
            'user' => $user,
            'token' => $token,
        ], Response::HTTP_CREATED);
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $user = User::where('email', $validated['email'])->get()->first();

        if (!$user || !Hash::check($validated['password'], $user->password)) {
            return new JsonResponse('Credenciales inválidas', Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $token = $user->createToken(config('app.name'))->plainTextToken;
        $user->load('role');

        return new JsonResponse([
            'user' => $user,
            'token' => $token,
        ], Response::HTTP_OK);
    }

    public function logout(): JsonResponse
    {
        Auth::user()->currentAccessToken()->delete();

        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }

    public function me(): JsonResponse
    {
        $user = Auth::user();
        $user->load('role');

        return new JsonResponse($user, Response::HTTP_OK);
    }

    public function recoverPassword(ForgotPasswordRequest $request)
    {
        $request->validated();
        Password::sendResetLink($request->only('email'));
    }

    public function resetPassword(ResetPasswordRequest $request)
    {
        $request->validated();

        Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill(['password' => $password])->setRememberToken(Str::random(60));
                $user->save();
                event(new PasswordReset($user));
            }
        );
    }
}
