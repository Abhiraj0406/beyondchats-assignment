<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GmailAccount extends Model
{
    protected $fillable = [
        'user_id',
        'google_id',
        'access_token',
        'refresh_token',
        'token_expires_at',
    ];
}
