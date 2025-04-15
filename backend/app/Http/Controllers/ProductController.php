<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    public function index()
    {
        // Ambil semua produk
        $products = Product::with('category')->get();

        return response()->json($products);
    }
    public function show(string $id)
    {
        // Ambil produk berdasarkan ID
        $product = Product::with('category')->find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        return response()->json($product);
    }
    public function store(Request $request)
    {
        // Validasi data yang diterima
        $validator = Validator::make($request->all(), [
            'categories_id'   => 'required|exists:categories,id',
            'name'          => 'required|string|max:255',
            'slug'          => 'required|string|max:255|unique:products',
            'description'   => 'nullable|string',
            'platform'      => 'required|string|max:255',
            'developer'     => 'required|string|max:255',
            'publisher'     => 'required|string|max:255',
            'release_date'  => 'required|string|max:255',
            'price'         => 'required|numeric',
            'image'         => 'required',
        ]);

        $validated = $validator->validate();

        if ($request->file('image')) {
            $url = $request->file('image')->store('products', 'public');
            $validated['image'] = $url;
        }


        // Buat produk baru
        $product = Product::create($validated);

        return response()->json($product, 201);
    }

    public function update(Request $request, $id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        // Validasi data yang diterima
        $validator = Validator::make($request->all(), [
            'categories_id'    => 'required|exists:categories,id',
            'name'           => 'required|string|max:255',
            'slug'           => 'required|string|max:255|unique:products,slug,' . $id,
            'description'    => 'nullable|string',
            'platform'       => 'required|string|max:255',
            'developer'      => 'required|string|max:255',
            'publisher'      => 'required|string|max:255',
            'release_date'   => 'required|string|max:255',
            'price'          => 'required|numeric',
            'image'          => 'nullable|file|image|mimes:jpeg,png,jpg,gif|max:2048', // Change to nullable
        ]);

        // Jika validasi gagal
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Jika ada gambar baru, upload dan simpan URL-nya
        if ($request->hasFile('image')) {
            $url = $request->file('image')->store('products', 'public');
            $product->image = $url;
        }

        // Perbarui produk
        $product->update($request->except('image')); // update tanpa menyertakan gambar jika tidak diubah

        return response()->json($product, 200);  // Mengembalikan objek produk yang telah diupdate
    }

    public function destroy($id)
    {
        // Cari produk berdasarkan ID
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        // Hapus produk
        $product->delete();

        return response()->json(['message' => 'Product deleted successfully']);
    }
    public function search(Request $request)
    {
        // Validasi parameter pencarian
        $request->validate([
            'query' => 'required|string|max:255',
        ]);

        // Cari produk berdasarkan nama
        $products = Product::where('name', 'like', '%' . $request->query . '%')->get();

        return response()->json($products);
    }
    public function filterByCategory(Request $request, $categoryId)
    {
        // Validasi parameter kategori
        $request->validate([
            'category_id' => 'required|exists:categories,id',
        ]);

        // Ambil produk berdasarkan kategori
        $products = Product::where('category_id', $categoryId)->get();

        return response()->json($products);
    }
}
