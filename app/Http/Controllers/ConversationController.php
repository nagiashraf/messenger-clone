<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Fluent;
use Illuminate\Support\Facades\DB;

class ConversationController extends Controller
{
    public function index()
    {
        return inertia('conversations/Index');
    }

    public function all()
    {
        $currentUserId = auth()->id();
        $conversations = User::find($currentUserId)
            ->conversations()
            ->with(['users', 'messages' => ['sender', 'seenBy' ]])
            ->orderBy('last_message_at', 'desc')
            ->get();

        return response()->json($conversations);
    }

    public function show(int $id)
    {
        $conversation = Conversation::with('users')->find($id);

        $messages = [];
        if ($conversation) {
            $messages = $conversation->messages()
                ->with(['sender', 'seenBy'])
                ->orderBy('created_at', 'asc')
                ->get();
        }

        return inertia('conversations/Show', [
            'conversation' => $conversation,
            'messages' => $messages,
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => ['required_without:is_group', 'required_if_declined:is_group'], // For one-to-one conversations
            'is_group' => ['nullable','boolean'],
            'members' => ['required_if_accepted:is_group', 'array:value'], // For group conversations
            'name' => ['required_if_accepted:is_group', 'string'], // For group conversations
        ]);

        $validator->sometimes(
            'members',
            'min:2',
            fn (Fluent $input) => $input->is_group
        )->validate();

        $validatedAttributes = $validator->validated();


        if (array_key_exists('is_group', $validatedAttributes) && $validatedAttributes['is_group']) {
            $newConversation = Conversation::create([
                'name' => $validatedAttributes['name'],
                'is_group' => $validatedAttributes['is_group'],
            ]);

            $memberIds = array_map(fn ($member) => $member['value'], $validatedAttributes['members']);
            $newConversation->users()->attach([$request->user()->id, ...$memberIds]);

            return inertia('conversations/Show', [
                'conversation' => $newConversation->with('users'),
            ]);
        } else {
            // Unlike groups, one-to-one conversations can only be created ONCE between two users
            $conversationId = DB::table('conversation_user')
                ->whereIn('user_id', [$request->user()->id, $validatedAttributes['user_id']])
                ->groupBy('conversation_id')
                ->havingRaw('COUNT(DISTINCT user_id) = ?', [2])
                ->value('conversation_id');

            $existingConversation = Conversation::
                where('id', $conversationId)
                ->first();

            if ($existingConversation) {
                return inertia('conversations/Show', [
                    'conversation' => $existingConversation->with('users'),
                ]);
            } else {
                $newConversation = Conversation::create(['is_group' => false]);
                $newConversation->users()->attach([$request->user()->id, $validatedAttributes['user_id']]);

                return inertia('conversations/Show', [
                    'conversation' => $newConversation->with('users'),
                ]);
            }
        }
    }

    public function destroy(int $id)
    {
        Conversation::findOrFail($id)->delete();

        return redirect()->route('conversations.index');
    }
}
