<?php

namespace App\Http\Controllers;

use App\Models\Categories;
use Illuminate\Http\Request;

class CategoriesController extends Controller
{
    public function index()
    {
        // Ambil semua kategori
        $categories = Categories::with('products')->get();

        return response()->json($categories);
    }

    public function show(string $id)
    {
        // Ambil kategori berdasarkan ID
        $category = Categories::with('products')->find($id);

        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }

        return response()->json($category);
    }

    public function store(Request $request)
    {
        // Validasi data yang diterima
        $request->validate([
            'name' => 'required|string|max:255',
            'key' => 'required|string|max:255|unique:categories',
            'slug' => 'required|string|max:255|unique:categories',
        ]);

        // Buat kategori baru
        $category = Categories::create($request->all());

        return response()->json($category, 201);
    }

    public function update(Request $request, $id)
    {
        // Validasi data yang diterima
        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'key' => 'sometimes|required|string|max:255|unique:categories,key,' . $id,
            'slug' => 'sometimes|required|string|max:255|unique:categories,slug,' . $id,
        ]);

        // Cari kategori berdasarkan ID
        $category = Categories::find($id);

        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }

        // Update kategori
        $category->update($request->all());

        return response()->json($category);
    }

    public function destroy($id)
    {
        // Cari kategori berdasarkan ID
        $category = Categories::find($id);

        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }

        // Hapus kategori
        $category->delete();

        return response()->json(['message' => 'Category deleted successfully']);
    }
}
