<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasFactory;

    protected $fillable = ['name', 'email', 'password', 'role'];

    // Constants for roles
    const ROLE_ADMIN = 'admin';
    const ROLE_USER = 'user';

    // Check if user is admin
    public function isAdmin()
    {
        return $this->role === self::ROLE_ADMIN;
    }

    // Check if user is regular user
    public function isUser()
    {
        return $this->role === self::ROLE_USER;
    }
}