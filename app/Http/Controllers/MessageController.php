<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Message;
use App\Models\Conversation;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'message' => ['nullable', 'string'],
            'image_url' => ['nullable', 'file'],
            'conversation_id' => 'required',
        ]);

        $newMessage = Message::create([
            'body' => $validated['message'],
            'image_url' => $validated['image_url'] ?? null,
            'conversation_id' => $validated['conversation_id'],
            'sender_id' => auth()->id(),
        ]);

        $newMessage->seenBy()->attach(auth()->id());

        $conversation = Conversation::with('users', 'messages.seenBy')->find($validated['conversation_id']);
        $conversation->last_message_at = now();
        $conversation->save();

        MessageSent::dispatch($newMessage->load('conversation'));

        return redirect()->route('conversations.show', $conversation->id);
    }
}
