<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

// Middleware CORS manual di setiap route group
Route::middleware([\App\Http\Middleware\CorsMiddleware::class])->group(function () {
    // Include semua API routes
    require __DIR__ . '/api/auth.php';
    require __DIR__ . '/api/category.php';
    require __DIR__ . '/api/product.php';
    require __DIR__ . '/api/transaction.php';
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
