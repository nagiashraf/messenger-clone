<?php

namespace App\Http\Controllers;

use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthProviderController extends Controller
{
    public function googleRedirect()
    {
        return Socialite::driver('google')->redirect();
    }

    public function googleCallback()
    {
        $googleUser = Socialite::driver('google')->user();

        $user = User::updateOrCreate([
            'google_provider_id' => $googleUser->getId(),
        ], [
            'name' => $googleUser->getName(),
            'email' => $googleUser->getEmail(),
            'image_url' => $googleUser->getAvatar(),
        ]);

        Auth::login($user);

        return redirect('/');
    }
}
