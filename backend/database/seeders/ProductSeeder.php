<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    public function run()
    {
        $products = [
            // Action Games
            [
                'name' => 'God of War',
                'description' => 'Epic action-adventure game',
                'price' => 599000,
                'image' => 'god-of-war.jpg',
                'category_id' => 1,
                'slug' => 'god-of-war',
                'platform' => 'PS5, PC',
                'developer' => 'Santa Monica Studio',
                'publisher' => 'Sony Interactive Entertainment',
                'release_date' => '2022-01-14'
            ],
            [
                'name' => 'Devil May Cry 5',
                'description' => 'Stylish action combat game',
                'price' => 499000,
                'image' => 'dmc5.jpg',
                'category_id' => 1,
                'slug' => 'devil-may-cry-5',
                'platform' => 'PS5, Xbox Series X, PC',
                'developer' => 'Capcom',
                'publisher' => 'Capcom',
                'release_date' => '2019-03-08'
            ],
            
            // Adventure Games
            [
                'name' => 'Uncharted 4',
                'description' => 'Action-adventure exploration game',
                'price' => 399000,
                'image' => 'uncharted4.jpg',
                'category_id' => 2,
                'slug' => 'uncharted-4',
                'platform' => 'PS5, PC',
                'developer' => 'Naughty Dog',
                'publisher' => 'Sony Interactive Entertainment',
                'release_date' => '2016-05-10'
            ],
            [
                'name' => 'Red Dead Redemption 2',
                'description' => 'Open-world western adventure',
                'price' => 699000,
                'image' => 'rdr2.jpg',
                'category_id' => 2,
                'slug' => 'red-dead-redemption-2',
                'platform' => 'PS5, Xbox Series X, PC',
                'developer' => 'Rockstar Games',
                'publisher' => 'Rockstar Games',
                'release_date' => '2018-10-26'
            ],

            // RPG Games
            [
                'name' => 'Final Fantasy VII Remake',
                'description' => 'Epic RPG adventure',
                'price' => 799000,
                'image' => 'ff7r.jpg',
                'category_id' => 3,
                'slug' => 'final-fantasy-vii-remake',
                'platform' => 'PS5, PC',
                'developer' => 'Square Enix',
                'publisher' => 'Square Enix',
                'release_date' => '2020-04-10'
            ],
            [
                'name' => 'The Witcher 3',
                'description' => 'Open-world action RPG',
                'price' => 299000,
                'image' => 'witcher3.jpg',
                'category_id' => 3,
                'slug' => 'the-witcher-3',
                'platform' => 'PS5, Xbox Series X, PC',
                'developer' => 'CD Projekt Red',
                'publisher' => 'CD Projekt',
                'release_date' => '2015-05-19'
            ],

            // Strategy Games
            [
                'name' => 'Civilization VI',
                'description' => '4X strategy game',
                'price' => 399000,
                'image' => 'civ6.jpg',
                'category_id' => 4,
                'slug' => 'civilization-vi',
                'platform' => 'PC',
                'developer' => 'Firaxis Games',
                'publisher' => '2K Games',
                'release_date' => '2016-10-21'
            ],
            [
                'name' => 'Age of Empires IV',
                'description' => 'Real-time strategy game',
                'price' => 499000,
                'image' => 'aoe4.jpg',
                'category_id' => 4,
                'slug' => 'age-of-empires-iv',
                'platform' => 'PC',
                'developer' => 'Relic Entertainment',
                'publisher' => 'Xbox Game Studios',
                'release_date' => '2021-10-28'
            ],

            // Sports Games
            [
                'name' => 'FIFA 23',
                'description' => 'Football simulation game',
                'price' => 699000,
                'image' => 'fifa23.jpg',
                'category_id' => 5,
                'slug' => 'fifa-23',
                'platform' => 'PS5, Xbox Series X, PC',
                'developer' => 'EA Vancouver',
                'publisher' => 'EA Sports',
                'release_date' => '2022-09-30'
            ],
            [
                'name' => 'NBA 2K23',
                'description' => 'Basketball simulation game',
                'price' => 699000,
                'image' => 'nba2k23.jpg',
                'category_id' => 5,
                'slug' => 'nba-2k23',
                'platform' => 'PS5, Xbox Series X, PC',
                'developer' => 'Visual Concepts',
                'publisher' => '2K Sports',
                'release_date' => '2022-09-09'
            ],
        ];

        DB::table('products')->insert($products);
    }
}