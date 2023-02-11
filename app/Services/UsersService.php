<?php

namespace App\Services;

use App\Mail\UserCreatedEmail;
use App\Models\User;
use Illuminate\Support\Facades\Mail;

class UsersService
{
    public static function sendWelcomeEmail(User $user, string $temporalPass): void
    {
        $mail = new UserCreatedEmail($user, $temporalPass);
        Mail::to($user->email)->send($mail);
    }
}
