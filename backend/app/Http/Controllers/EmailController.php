<?php
namespace App\Http\Controllers;

use App\Models\EmailThread;
use App\Services\GmailService;
use Illuminate\Http\Request;

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

    public function reply(Request $request, GmailService $gmailService)
    {
        $threadId = $request->thread_id;
        $message  = $request->message;

        $gmailService->sendReply($threadId, $message);

        return response()->json([
            "message" => "Reply sent successfully",
        ]);
    }
}
