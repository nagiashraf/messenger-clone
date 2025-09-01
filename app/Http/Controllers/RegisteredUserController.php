<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RegisteredUserController extends Controller
{
    public function index()
    {
        $currentUser = Auth::user();

        $users = User::select('id', 'name', 'email', 'image_url')
            ->where('email', '!=', $currentUser->email)
            ->latest()
            ->get();

        return inertia('users/Index', ['users' => $users]);
    }

    public function all()
    {
        $users = User::where('id', '!=', auth()->id())->get();
        return response()->json($users);
    }

    public function store()
    {
        $validatedAttributes = request()->validate([
            'name' => ['required'],
            'email' => ['required', 'email'],
            'password' => ['required']
        ]);

        $user = User::create($validatedAttributes);

        Auth::login($user);

        redirect('/users');
    }
}
