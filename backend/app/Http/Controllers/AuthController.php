<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => bcrypt($request->password),
            'role'     => 'user',
        ]);

        return response()->json([
            'message' => 'Registered successfully',
            'user'    => $user,
        ], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'token'   => $token,
            'message' => 'Login successful',
        ]);
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
