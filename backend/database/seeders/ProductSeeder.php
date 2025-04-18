<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $games = [
            [
                'categories_id' => 1, 
                'name' => 'Call of Duty: Modern Warfare',
                'description' => 'First-person shooter set in modern conflict.',
                'slug' => Str::slug('Call of Duty: Modern Warfare'),
                'platform' => 'PC',
                'developer' => 'Infinity Ward',
                'publisher' => 'Activision',
                'release_date' => '2019-10-25',
                'price' => 59.99,
                'image' => 'https://upload.wikimedia.org/wikipedia/en/6/6f/Call_of_Duty_Modern_Warfare.jpg',
            ],
            [
                'categories_id' => 2, // Adventure Games
                'name' => 'The Legend of Zelda: Breath of the Wild',
                'description' => 'Open-world adventure game full of puzzles and exploration.',
                'slug' => Str::slug('The Legend of Zelda: Breath of the Wild'),
                'platform' => 'Nintendo Switch',
                'developer' => 'Nintendo EPD',
                'publisher' => 'Nintendo',
                'release_date' => '2017-03-03',
                'price' => 59.99,
                'image' => 'https://upload.wikimedia.org/wikipedia/en/0/0b/The_Legend_of_Zelda_Breath_of_the_Wild.jpg',
            ],
            [
                'categories_id' => 3, // RPG Games
                'name' => 'The Witcher 3: Wild Hunt',
                'description' => 'Story-rich RPG with monster hunting and branching quests.',
                'slug' => Str::slug('The Witcher 3: Wild Hunt'),
                'platform' => 'PC, PS4, Xbox One',
                'developer' => 'CD Projekt Red',
                'publisher' => 'CD Projekt',
                'release_date' => '2015-05-19',
                'price' => 39.99,
                'image' => 'https://upload.wikimedia.org/wikipedia/en/0/0c/Witcher_3_cover_art.jpg',
            ],
        ];

        Product::insert($games);
    }
}
