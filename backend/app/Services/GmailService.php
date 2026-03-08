<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use App\Models\GmailAccount;
use App\Models\EmailThread;
use App\Models\Email;

class GmailService
{
    public function syncEmails($days)
    {
        $account = GmailAccount::first();

        $accessToken = $account->access_token;

        // Gmail API endpoint
        $response = Http::withToken($accessToken)
            ->get('https://gmail.googleapis.com/gmail/v1/users/me/threads');

        $threads = $response->json()['threads'] ?? [];

        foreach ($threads as $thread) {
            $this->storeThread($thread['id'], $accessToken);
        }
    }

    private function storeThread($threadId, $accessToken)
    {
        $response = Http::withToken($accessToken)
            ->get("https://gmail.googleapis.com/gmail/v1/users/me/threads/$threadId");

        $threadData = $response->json();

        $thread = EmailThread::updateOrCreate(
            ['gmail_thread_id' => $threadId],
            [
                'subject' => $threadData['snippet'] ?? '',
                'snippet' => $threadData['snippet'] ?? ''
            ]
        );

        foreach ($threadData['messages'] as $message) {
            $this->storeMessage($message, $thread->id);
        }
    }

    private function storeMessage($message, $threadId)
    {
        $headers = collect($message['payload']['headers']);

        $from = $headers->firstWhere('name', 'From')['value'] ?? '';
        $to = $headers->firstWhere('name', 'To')['value'] ?? '';

        Email::updateOrCreate(
            ['gmail_message_id' => $message['id']],
            [
                'thread_id' => $threadId,
                'from_email' => $from,
                'to_email' => $to,
                'body_text' => $message['snippet'] ?? '',
                'sent_at' => now()
            ]
        );
    }
}