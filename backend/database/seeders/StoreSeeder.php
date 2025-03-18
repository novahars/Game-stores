<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StoreSeeder extends Seeder {
    public function run() {
        DB::table('stores')->insert([
            ['id' => 1, 'key' => 'pc', 'title' => 'PC Store', 'description' => 'Menjual berbagai part dan aksesoris PC.'],
            ['id' => 2, 'key' => 'console', 'title' => 'Console Store', 'description' => 'Menjual konsol gaming seperti Xbox dan Switch.'],
            ['id' => 3, 'key' => 'playstation', 'title' => 'PlayStation Store', 'description' => 'Menjual perangkat dan aksesoris PlayStation.'],
            ['id' => 4, 'key' => 'handphones', 'title' => 'Handphones Store', 'description' => 'Menjual berbagai macam handphone.'],
            ['id' => 5, 'key' => 'game_console', 'title' => 'Game Console Store', 'description' => 'Menjual berbagai game untuk konsol.'],
            ['id' => 6, 'key' => 'game_ps', 'title' => 'Game PS Store', 'description' => 'Menjual game-game untuk PlayStation.'],
        ]);
    }
}
