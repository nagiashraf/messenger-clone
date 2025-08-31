<?php

use App\Http\Controllers\AuthProviderController;
use App\Http\Controllers\ConversationController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\RegisteredUserController;
use App\Http\Controllers\SessionController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get('/', function () {
        return inertia('Home');
    });

    Route::post('/register', [RegisteredUserController::class, 'store']);
    Route::post('/login', [SessionController::class, 'store']);

    Route::get('/auth/google/redirect', [AuthProviderController::class, 'googleRedirect']);
    Route::get('/auth/google/callback', [AuthProviderController::class, 'googleCallback']);
});

Route::middleware('auth')->group(function () {
    Route::get('/users', [RegisteredUserController::class, 'index'])
        ->name('users.index');

    Route::post('/logout', [SessionController::class, 'destroy']);

    Route::get('/conversations', [ConversationController::class, 'index'])
        ->name('conversations.index');

    Route::get('/conversations/{id}', [ConversationController::class, 'show'])
        ->name('conversations.show');

    Route::post('/conversations', [ConversationController::class, 'store'])
        ->name('conversations.store');

    Route::delete('/conversations/{id}', [ConversationController::class, 'destroy'])
        ->name('conversations.destroy');

    Route::get('/api/conversations', [ConversationController::class, 'all']);

    Route::post('/messages', [MessageController::class, 'store'])
        ->name('messages.store');
});
