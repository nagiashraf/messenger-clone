<?php

use App\Models\Conversation;
use App\Models\User;
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('messages.new.{conversationId}', function (User $user, int $conversationId) {
    $conversation = Conversation::find($conversationId);

    if (! $conversation) {
        return false;
    }

    $conversation->load('users');

    return $conversation->users->contains($user);
});
