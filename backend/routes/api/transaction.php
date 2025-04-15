<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TransactionController;

Route::prefix('transactions')->group(function () {
    Route::post('/', [TransactionController::class, 'store']);
}); 