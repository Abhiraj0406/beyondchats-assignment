<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Auth\GoogleAuthController;
use App\Http\Controllers\EmailSyncController;
use App\Http\Controllers\EmailController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/auth/google', [GoogleAuthController::class, 'redirect']);
Route::get('/auth/google/callback', [GoogleAuthController::class, 'callback']);

Route::post('/emails/sync', [EmailSyncController::class, 'sync']);

Route::get('/emails/threads', [EmailController::class, 'threads']);
Route::get('/emails/threads/{id}', [EmailController::class, 'thread']);
