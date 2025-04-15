<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes (butuh token)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);

    // Hanya untuk admin
    Route::get('/admin', [AuthController::class, 'adminOnly'])->middleware('role:admin');
    Route::apiResource('/categories', CategoriesController::class)->middleware('role:admin');
    Route::apiResource('/products', ProductController::class)->middleware('role:admin');
});
