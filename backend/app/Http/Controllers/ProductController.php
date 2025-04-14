<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    // Menampilkan semua produk
    public function index()
    {
        $categories = Category::with('products')->get();
        $formattedResponse = [];

        foreach ($categories as $category) {
            $formattedResponse[$category->key] = [
                'title' => $category->name,
                'products' => $category->products
            ];
        }

        return response()->json($formattedResponse);
    }

    // Menampilkan produk berdasarkan ID
    public function show($id)
    {
        $product = Product::with('category')->find($id);

        if ($product) {
            return response()->json($product);
        }
        
        return response()->json(['message' => 'Product not found'], 404);
    }

    // Menampilkan produk berdasarkan kategori
    public function byCategory($key)
    {
        $category = Category::where('key', $key)->first();
        
        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }

        $products = Product::where('category_id', $category->id)->get();
        return response()->json($products);
    }
}
