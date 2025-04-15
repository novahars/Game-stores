<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        try {
            $categories = Category::all();
            return response()->json($categories);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch categories'], 500);
        }
    }

    public function products($key)
    {
        try {
            $category = Category::where('key', $key)->first();
            
            if (!$category) {
                return response()->json(['error' => 'Category not found'], 404);
            }

            $products = $category->products()->with('category')->get();
            
            return response()->json([
                'category' => $category,
                'products' => $products
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch products'], 500);
        }
    }

    public function findByKey($key)
    {
        try {
            $category = Category::where('key', $key)->first();
            
            if (!$category) {
                return response()->json(['error' => 'Category not found'], 404);
            }

            return response()->json($category);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch category'], 500);
        }
    }

    public function getProducts($id)
    {
        try {
            $category = Category::findOrFail($id);
            $products = $category->products()->with('category')->get();
            
            return response()->json([
                'category' => $category,
                'products' => $products
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch products'], 500);
        }
    }
}
