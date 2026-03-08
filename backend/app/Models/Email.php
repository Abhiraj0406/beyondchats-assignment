<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Email extends Model
{
    protected $fillable = [
        'thread_id',
        'gmail_message_id',
        'from_email',
        'to_email',
        'body_html',
        'body_text',
        'sent_at'
    ];

    public function thread()
    {
        return $this->belongsTo(EmailThread::class);
    }

    public function attachments()
    {
        return $this->hasMany(EmailAttachment::class);
    }
}