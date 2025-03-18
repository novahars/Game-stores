<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Store;

class StoreController extends Controller
{
    public function index()
    {
        // Mengambil semua data store
        $stores = Store::all();

        // Mengembalikan data dalam format JSON
        return response()->json($stores);
    }

    public function show($id)
    {
        // Mengambil store berdasarkan ID
        $store = Store::find($id);

        if ($store) {
            return response()->json($store);
        } else {
            return response()->json(['message' => 'Store not found'], 404);
        }
    }
}
