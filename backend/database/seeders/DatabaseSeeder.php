<?php

use Illuminate\Database\Seeder;
use Database\Seeders\StoreSeeder;
use Database\Seeders\ProductSeeder;
use Database\Seeders\AdminSeeder;
use Database\Seeders\UserSeeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call([
            StoreSeeder::class,
            ProductSeeder::class,
            AdminSeeder::class,
            UserSeeder::class,
        ]);
    }
}
