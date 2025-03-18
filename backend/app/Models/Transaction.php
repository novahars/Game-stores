<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'store_id',
        'product_id',
        'user_id',
        'quantity',
        'total_price'
    ];

    // Optional: define relationships
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function store()
    {
        return $this->belongsTo(\App\Models\Store::class);
    }

    public function user()
    {
        return $this->belongsTo(\App\Models\User::class);
    }
}