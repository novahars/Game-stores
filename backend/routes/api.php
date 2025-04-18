<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\ProductController;
use App\Models\Categories;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes (butuh token)
Route::middleware('auth:sanctum')->group(function () {

    Route::get('/categories/key/{key}', [CategoriesController::class, 'showByKey']);
    Route::get('/categories/{id}/products', function ($id) {
        $category = Categories::with('products')->find($id);
        return response()->json([
            'products' => $category?->products ?? []
        ]);
    });

    // Hanya untuk admin
    Route::apiResource('/categories', CategoriesController::class)->middleware('role:admin');
    Route::apiResource('/products', ProductController::class)->middleware('role:admin');
});
