<?php

namespace App\Actions\Auth;

use Illuminate\Support\Facades\Password;

class PasswordResetLinkAction
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function send_link($email): void
    {
        defer(fn () => Password::sendResetLink(
            $email
        ));
    }
}
