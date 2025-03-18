<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    // Menampilkan semua produk
    public function index()
    {
        // Mengambil semua produk dengan relasi store
        $products = Product::with('store')->get();
        return response()->json($products);
    }

    // Menampilkan produk berdasarkan ID
    public function show($id)
    {
        $product = Product::with('store')->find($id);

        if ($product) {
            return response()->json($product);
        } else {
            return response()->json(['message' => 'Product not found'], 404);
        }
    }
}
