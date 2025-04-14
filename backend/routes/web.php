<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StoreController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

// Middleware CORS manual di setiap route group
Route::middleware([\App\Http\Middleware\CorsMiddleware::class])->group(function () {
    // Auth routes
    Route::post('/api/register', [AuthController::class, 'register']);
    Route::post('/api/login', [AuthController::class, 'login']);
    Route::get('/api/user/check', [AuthController::class, 'checkUser']);

    // Store routes
    Route::get('/api/stores', [StoreController::class, 'index']);
    Route::get('/api/stores/{id}', [StoreController::class, 'show']);

    // Product routes
    Route::get('/api/products', [ProductController::class, 'index']);
    Route::get('/api/products/{id}', [ProductController::class, 'show']);

    // Transaction routes
    Route::post('/api/transactions', [TransactionController::class, 'store']);

    // Category routes
    Route::get('/api/categories', [CategoryController::class, 'index']);
    Route::get('/api/categories/{key}/products', [CategoryController::class, 'products']);
    Route::get('/api/categories/by-key/{key}', [CategoryController::class, 'findByKey']);
    Route::get('/api/categories/{id}/products', [CategoryController::class, 'getProducts']);
});

// Handle OPTIONS requests for CORS
Route::options('/{any}', function () {
    return response()->json(['message' => 'CORS OK'], 200);
})->where('any', '.*');

// Image handling route
Route::get('/product-images', function () {
    $files = File::files(public_path('images/products'));
    $imageUrls = [];
    foreach ($files as $file) {
        $imageUrls[] = asset('images/products/' . $file->getFilename());
    }
    return response()->json($imageUrls);
});

// Test route
Route::get('/api/test-api', function () {
    return response()->json(['message' => 'API Bekerja!']);
});
