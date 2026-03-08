<?php

namespace App\Http\Controllers;

use App\Models\EmailThread;

class EmailController extends Controller
{
    public function threads()
    {
        $threads = EmailThread::with('emails')
            ->latest()
            ->get();

        return response()->json($threads);
    }

    public function thread($id)
    {
        $thread = EmailThread::with('emails.attachments')
            ->findOrFail($id);

        return response()->json($thread);
    }
}