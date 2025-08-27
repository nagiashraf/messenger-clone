<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Message extends Model
{
    protected $fillable = [
        'body',
        'image_url',
        'sender_id',
        'conversation_id',
    ];

    public function sender(): BelongsTo
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    public function seenBy(): BelongsToMany
    {
        return $this->belongsToMany(
            User::class,
            'seen_message_user',
            'seen_message_id',
            'user_id');
    }

    public function conversation(): BelongsTo
    {
        return $this->belongsTo(Conversation::class);
    }
}
