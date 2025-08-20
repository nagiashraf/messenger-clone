<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RegisteredUserController extends Controller
{
    public function store()
    {
        $validatedAttributes = request()->validate([
            'name' => ['required'],
            'email' => ['required', 'email'],
            'password' => ['required']
        ]);

        $user = User::create($validatedAttributes);

        Auth::login($user);

        redirect('/');
    }
}
