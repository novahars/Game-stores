<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;

Route::prefix('categories')->group(function () {
    Route::get('/', [CategoryController::class, 'index']);
    Route::get('/{key}/products', [CategoryController::class, 'products']);
    Route::get('/by-key/{key}', [CategoryController::class, 'findByKey']);
}); 