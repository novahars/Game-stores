<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StoreController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ContentController;

Route::get('/api/stores', [StoreController::class, 'index']);
Route::get('/api/stores/{id}', [StoreController::class, 'show']);

Route::get('/api/products', [ProductController::class, 'index']);
Route::get('/api/products/{id}', [ProductController::class, 'show']);

