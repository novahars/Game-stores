<?php

namespace Database\Seeders;

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
            ['id' => 1, 'name' => 'Action Games', 'slug' => 'action-games', 'key' => 'monas'],
            ['id' => 2, 'name' => 'Adventure Games', 'slug' => 'adventure-games', 'key' => 'ferrishWheel'],
            ['id' => 3, 'name' => 'RPG Games', 'slug' => 'rpg-games', 'key' => 'monument'],
            ['id' => 4, 'name' => 'Strategy Games', 'slug' => 'strategy-games', 'key' => 'calpperboard'],
            ['id' => 5, 'name' => 'Sports Games', 'slug' => 'sports-games', 'key' => 'jumbotron'],
            ['id' => 6, 'name' => 'Racing Games', 'slug' => 'racing-games', 'key' => 'stage'],
        ];

        DB::table('categories')->insert($categories);
    }
}
