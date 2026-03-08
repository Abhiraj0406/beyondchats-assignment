<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EmailThread extends Model
{
    protected $fillable = [
        'gmail_thread_id',
        'subject',
        'snippet'
    ];

    public function emails()
    {
        return $this->hasMany(Email::class, 'thread_id');
    }
}