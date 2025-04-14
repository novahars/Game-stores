<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * Register a new user.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'name'     => $validated['name'],
            'email'    => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        return response()->json([
            'message' => 'Registration successful',
            'user'    => $user
        ], 201);
    }

    /**
     * Log in an existing user.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $validated = $request->validate([
            'email'    => 'required|string|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $validated['email'])->first();

        if (!$user || !Hash::check($validated['password'], $user->password)) {
            return response()->json([
                'message' => 'Login failed: incorrect credentials',
            ], 401);
        }

        return response()->json([
            'message' => 'Login successful',
            'user'    => $user,
        ], 200);
    }

    /**
     * Check if a user exists via query parameter (?id=...).
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function checkUser(Request $request)
    {
        $id = $request->query('id');

        if (!$id) {
            return response()->json([
                'exists'  => false,
                'message' => 'User ID not provided!',
            ], 400);
        }

        $user = User::find($id);

        if ($user) {
            return response()->json([
                'exists' => true,
                'user'   => $user,
            ], 200);
        } else {
            return response()->json([
                'exists'  => false,
                'message' => 'User not found!',
            ], 404);
        }
    }
}