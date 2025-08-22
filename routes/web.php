<?php

use App\Http\Controllers\AuthProviderController;
use App\Http\Controllers\RegisteredUserController;
use App\Http\Controllers\SessionController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return inertia('Home');
});

Route::post('/register', [RegisteredUserController::class, 'store']);
Route::post('/login', [SessionController::class, 'store']);

Route::get('/auth/google/redirect', [AuthProviderController::class, 'googleRedirect']);
Route::get('/auth/google/callback', [AuthProviderController::class, 'googleCallback']);
