<?php

use App\Http\Controllers\RegisteredUserController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return inertia('Home');
});

Route::post('/register', [RegisteredUserController::class, 'store']);
