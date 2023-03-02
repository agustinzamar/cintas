<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class UserCreatedEmail extends Mailable
{
    use Queueable, SerializesModels;

    public User $user;

    public string $temporalPass;

    public function __construct(User $user, string $temporalPass)
    {
        $this->user = $user;
        $this->temporalPass = $temporalPass;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Bienvenido a Cintas Calzados',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'mail.user-created',
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
