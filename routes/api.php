<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CompaniesController;
use App\Http\Controllers\PaymentMethodsController;
use App\Http\Controllers\RolesController;
use App\Http\Controllers\SubscriptionsController;
use App\Http\Controllers\TicketTypeController;
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
    Route::post('/register', [AuthController::class, 'register'])->name('auth.register');
    Route::delete('/logout', [AuthController::class, 'logout'])->name('auth.logout');
    Route::get('/me', [AuthController::class, 'me'])->name('auth.me');

    Route::apiResource('users', UsersController::class);
    Route::post('users/{user}', [UsersController::class, 'enable']);
    Route::apiResource('roles', RolesController::class);
    Route::apiResource('subscriptions', SubscriptionsController::class);
    Route::post('subscriptions/{subscription}/restore', [SubscriptionsController::class, 'restore']);

    Route::middleware('auth.superadmin')->group(function () {
        Route::apiResource('companies', CompaniesController::class);
    });

    //TODO: wrap in admin middleware
    Route::apiResource('payment-methods', PaymentMethodsController::class);
    Route::get('/payment-methods-allowed', [PaymentMethodsController::class, 'showByCompany']);
});

Route::post('/login', [AuthController::class, 'login'])->name('auth.login');
