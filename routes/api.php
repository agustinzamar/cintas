<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CompaniesController;
use App\Http\Controllers\PaymentMethodsController;
use App\Http\Controllers\RolesController;
use App\Http\Controllers\SubscriptionsController;
use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    // ---- [ Auth ] ----
    Route::post('/register', [AuthController::class, 'register'])->name('auth.register');
    Route::delete('/logout', [AuthController::class, 'logout'])->name('auth.logout');
    Route::get('/me', [AuthController::class, 'me'])->name('auth.me');

    // ---- [ Companies ] ----
    Route::apiResource('companies', CompaniesController::class);
    Route::post('companies/{company}/restore', [CompaniesController::class, 'restore']);

    // ---- [ Users ] ----
    Route::apiResource('users', UsersController::class);
    Route::post('users/{user}', [UsersController::class, 'enable']);

    // ---- [ Roles ] ----
    Route::apiResource('roles', RolesController::class);

    // ---- [ Subscriptions ] ----
    Route::apiResource('subscriptions', SubscriptionsController::class);
    Route::post('subscriptions/{subscription}/restore', [SubscriptionsController::class, 'restore']);


    // ---- [ Payment Methods ] ----
    //TODO: wrap in admin middleware
    Route::apiResource('payment-methods', PaymentMethodsController::class);
    Route::get('/payment-methods-allowed', [PaymentMethodsController::class, 'showByCompany']);

    // Actions only allowed to the superadmin
    Route::middleware('auth.superadmin')->group(function () {
    });
});

Route::post('/login', [AuthController::class, 'login'])->name('auth.login');
