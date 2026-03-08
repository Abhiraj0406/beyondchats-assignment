<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EmailAttachment extends Model
{
    protected $fillable = [
        'email_id',
        'filename',
        'mime_type',
        'file_path'
    ];
}
