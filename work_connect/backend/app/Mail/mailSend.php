<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;


class MailSend extends Mailable
{
    use Queueable, SerializesModels;

    public $details; // プロパティとして定義

    /**
     * Create a new message instance.
     */
    public function __construct($details) // コンストラクタで受け取る
    {
        $this->details = $details;
    }

    public function build()
    {
        return $this->subject('Test Mail from Laravel')
                    ->view('emails.text'); // ビュー名を指定
    }
}