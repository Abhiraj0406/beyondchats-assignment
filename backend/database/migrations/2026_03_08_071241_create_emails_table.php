<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('emails', function (Blueprint $table) {
            $table->id();
            $table->foreignId('thread_id')->constrained('email_threads')->cascadeOnDelete();
            $table->string('gmail_message_id')->unique();
        
            $table->string('from_email');
            $table->string('to_email');
        
            $table->longText('body_html')->nullable();
            $table->longText('body_text')->nullable();
        
            $table->timestamp('sent_at')->nullable();
        
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('emails');
    }
};
