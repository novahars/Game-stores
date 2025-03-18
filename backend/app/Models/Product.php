<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    // Kolom yang boleh diisi
    protected $fillable = ['store_id', 'name', 'description', 'price', 'image'];

    // Menentukan relasi dengan model Store
    public function store()
    {
        return $this->belongsTo(Store::class, 'store_id');
    }
}
