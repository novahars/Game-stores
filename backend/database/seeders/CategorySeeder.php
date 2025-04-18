<?php

namespace Database\Seeders;

use App\Models\Categories;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['id' => 1, 'name' => 'Action Games', 'slug' => 'action-games', 'key' => 'pc'],
            ['id' => 2, 'name' => 'Adventure Games', 'slug' => 'adventure-games', 'key' => 'game_ps'],
            ['id' => 3, 'name' => 'RPG Games', 'slug' => 'rpg-games', 'key' => 'game_console'],
            ['id' => 4, 'name' => 'Strategy Games', 'slug' => 'strategy-games', 'key' => 'handphones'],
            ['id' => 5, 'name' => 'Sports Games', 'slug' => 'sports-games', 'key' => 'console'],
            ['id' => 6, 'name' => 'Racing Games', 'slug' => 'racing-games', 'key' => 'playstation'],
        ];

        Categories::insert($categories);
    }
}
