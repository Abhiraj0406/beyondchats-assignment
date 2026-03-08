<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\GmailService;

class EmailSyncController extends Controller
{
    protected $gmailService;

    public function __construct(GmailService $gmailService)
    {
        $this->gmailService = $gmailService;
    }

    public function sync(Request $request)
    {
        $days = $request->input('days', 7);

        $this->gmailService->syncEmails($days);

        return response()->json([
            'message' => 'Emails synced successfully'
        ]);
    }
}