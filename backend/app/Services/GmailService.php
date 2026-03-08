<?php
namespace App\Services;

use App\Models\Email;
use App\Models\EmailThread;
use App\Models\GmailAccount;
use Illuminate\Support\Facades\Http;

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
                'snippet' => $threadData['snippet'] ?? '',
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
        $to   = $headers->firstWhere('name', 'To')['value'] ?? '';

        Email::updateOrCreate(
            ['gmail_message_id' => $message['id']],
            [
                'thread_id'  => $threadId,
                'from_email' => $from,
                'to_email'   => $to,
                'body_text'  => $message['snippet'] ?? '',
                'sent_at'    => now(),
            ]
        );
    }

    public function sendReply($threadId, $message)
    {
        $account     = \App\Models\GmailAccount::first();
        $accessToken = $account->access_token;

        $thread    = \App\Models\EmailThread::with('emails')->findOrFail($threadId);
        $lastEmail = $thread->emails->last();

        $to      = $lastEmail->from_email;
        $subject = "Re: " . $thread->subject;

        $emailContent =
            "To: $to\r\n" .
            "Subject: $subject\r\n" .
            "Content-Type: text/plain; charset=utf-8\r\n\r\n" .
            $message;

        // Gmail requires URL-safe base64
        $rawMessage = rtrim(strtr(base64_encode($emailContent), '+/', '-_'), '=');

        $body = [
            "raw"      => $rawMessage,
            "threadId" => $thread->gmail_thread_id,
        ];

        $response = \Illuminate\Support\Facades\Http::withToken($accessToken)
            ->post("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", $body);

        return $response->json();
    }
}
