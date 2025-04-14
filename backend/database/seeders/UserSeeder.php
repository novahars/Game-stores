<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run()
    {
        // Create an admin
        User::create([
            'name' => 'Admin Name',
            'email' => 'admin@example.com',
            'password' => bcrypt('password'),
            'role' => User::ROLE_ADMIN
        ]);

        // Create a regular user
        User::create([
            'name' => 'User Name',
            'email' => 'user@example.com',
            'password' => bcrypt('password'),
            'role' => User::ROLE_USER
        ]);
    }
}