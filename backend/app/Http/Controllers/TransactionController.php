<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transaction;
use App\Models\Product;

class TransactionController extends Controller
{
    public function store(Request $request)
    {
        // Validate the request. Make sure you also pass product_id, store_id & user_id.
        $validated = $request->validate([
            'user_id'    => 'required|exists:users,id',
            'store_id'   => 'required|exists:stores,id',
            'product_id' => 'required|exists:products,id',
            'quantity'   => 'required|integer|min:1',
        ]);

        $product = Product::find($validated['product_id']);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $validated['total_price'] = $product->price * $validated['quantity'];
        $transaction = Transaction::create($validated);

        return response()->json([
            'message' => 'Transaction successful',
            'transaction' => $transaction
        ], 201);
    }
}