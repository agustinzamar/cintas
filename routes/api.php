<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CitiesController;
use App\Http\Controllers\CompaniesController;
use App\Http\Controllers\OrdersController;
use App\Http\Controllers\ProvincesController;
use App\Http\Controllers\RolesController;
use App\Http\Controllers\SizesController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\VendorsController;
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
    // Actions only allowed to the superadmin
    Route::middleware('auth.superadmin')->group(function () {
    });

    // Actions only allowed to the admins and superadmins
    Route::middleware('auth.admin')->group(function () {
        // ---- [ Provinces and Cities ] ----
        Route::get('provinces', [ProvincesController::class, 'index']);
        Route::get('cities', [CitiesController::class, 'index']);
        Route::get('cities/{provinceId}', [CitiesController::class, 'getByProvince']);

        // ---- [ Roles ] ----
        Route::get('roles', [RolesController::class, 'index']);

        // ---- [ Users ] ----
        Route::apiResource('users', UsersController::class);
        Route::post('users/{user}', [UsersController::class, 'enable']);

        // ---- [ Companies ] ----
        Route::apiResource('companies', CompaniesController::class);
        Route::post('companies/{company}/restore', [CompaniesController::class, 'restore']);

        // ---- [ Vendors ] ----
        Route::post('vendors', [VendorsController::class, 'store']);
        Route::get('vendors/{vendor}', [VendorsController::class, 'show']);
        Route::put('vendors/{vendor}', [VendorsController::class, 'update']);
        Route::delete('vendors/{vendor}', [VendorsController::class, 'destroy']);
        Route::post('vendors/{vendor}/restore', [VendorsController::class, 'restore']);
        Route::apiResource('vendors', VendorsController::class);
    });

    // Actions allowed to all users

    // ---- [ Auth ] ----
    Route::delete('/logout', [AuthController::class, 'logout'])->name('auth.logout');
    Route::get('/me', [AuthController::class, 'me'])->name('auth.me');

    // ---- [ Sizes ] ----
    Route::apiResource('sizes', SizesController::class);

    // ---- [ Orders ] ----
    Route::apiResource('orders', OrdersController::class);
    Route::put('orders/{order}/updateStatus', [OrdersController::class, 'updateStatus']);

    // ---- [ Vendors ] ----
    Route::get('vendors', [VendorsController::class, 'index']);
});

Route::post('/login', [AuthController::class, 'login'])->name('auth.login');
Route::post('/recover-password', [AuthController::class, 'recoverPassword'])->name('password.recover');
Route::post('/reset-password', [AuthController::class, 'resetPassword'])->name('password.reset');
