<?php

namespace Database\Seeders;


use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder {
    public function run() {
        DB::table('products')->insert([
            // PC Store
            ['store_id' => 1, 'name' => 'RTX 4060', 'description' => 'GPU terbaru untuk gaming PC.', 'price' => 8000000, 'image' => 'images/products/rtx4060.jpg'],
            ['store_id' => 1, 'name' => 'Intel i7 12700K', 'description' => 'Prosesor high-performance.', 'price' => 6500000, 'image' => 'images/products/i712700k.jpg'],

            // Console Store
            ['store_id' => 2, 'name' => 'Xbox Series X', 'description' => 'Konsol terbaru dari Microsoft.', 'price' => 7500000, 'image' => 'images/products/xboxseriesx.jpg'],
            ['store_id' => 2, 'name' => 'Nintendo Switch OLED', 'description' => 'Konsol portable dengan layar OLED.', 'price' => 5500000, 'image' => 'images/products/switch_oled.jpg'],

            // PlayStation Store
            ['store_id' => 3, 'name' => 'PlayStation 5', 'description' => 'Konsol generasi terbaru Sony.', 'price' => 8000000, 'image' => 'images/products/ps5.jpg'],
            ['store_id' => 3, 'name' => 'DualSense Controller', 'description' => 'Kontroler wireless PS5.', 'price' => 1200000, 'image' => 'images/products/dualsense.jpg'],

            // Handphone Store
            ['store_id' => 4, 'name' => 'ROG Phone 7', 'description' => 'HP gaming flagship dari Asus.', 'price' => 10000000, 'image' => 'images/products/rogphone7.jpg'],
            ['store_id' => 4, 'name' => 'Black Shark 5 Pro', 'description' => 'HP gaming dengan performa tinggi.', 'price' => 9500000, 'image' => 'images/products/blackshark5pro.jpg'],

            // Game Console Store
            ['store_id' => 5, 'name' => 'Elden Ring (Xbox)', 'description' => 'Game RPG open world untuk Xbox.', 'price' => 800000, 'image' => 'images/products/eldenring_xbox.jpg'],
            ['store_id' => 5, 'name' => 'Halo Infinite (Xbox)', 'description' => 'Game FPS eksklusif Xbox.', 'price' => 700000, 'image' => 'images/products/haloinfinite_xbox.jpg'],

            // Game PlayStation Store
            ['store_id' => 6, 'name' => 'God of War Ragnarok', 'description' => 'Game action PS5 terbaik.', 'price' => 900000, 'image' => 'images/products/gow_ragnarok.jpg'],
            ['store_id' => 6, 'name' => 'The Last of Us Part II', 'description' => 'Game petualangan PS.', 'price' => 750000, 'image' => 'images/products/tlou2.jpg'],
        ]);
    }
}
