<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StoreController;
use App\Http\Controllers\TransactionController;

Route::middleware('api')->group(function () {
    Route::get('/stores', [StoreController::class, 'index']);  // Ambil semua toko
    Route::get('/stores/{id}', [StoreController::class, 'show']); // Ambil toko berdasarkan ID
});

Route::get('/test-api', function () {
    return response()->json(['message' => 'API Bekerja!']);
});


Route::post('/transactions', [TransactionController::class, 'store']);