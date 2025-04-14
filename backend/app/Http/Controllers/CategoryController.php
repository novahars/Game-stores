<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::all();
        return response()->json($categories);
    }

    public function products($key)
    {
        $category = Category::where('key', $key)->first();
        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }
        
        $products = $category->products;
        return response()->json($products);
    }

    public function findByKey($key)
    {

        // Convert to lowercase for case-insensitive comparison
        $normalizedKey = strtolower($key);
        
        $category = Category::whereRaw('LOWER(key) = ?', [$normalizedKey])->first();

        if (!$category) {
            return response()->json(['error' => 'Category not found'], 404);
        }

        return response()->json($category);
    }

    public function getProducts($id)
    {
        $category = Category::find($id);
        
        if (!$category) {
            return response()->json(['error' => 'Category not found'], 404);
        }

        $products = $category->products;
        return response()->json($products);
    }
}
