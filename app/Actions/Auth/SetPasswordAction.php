<?php

namespace App\Actions\Auth;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class SetPasswordAction
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function set_password($request): void
    {
        $user = User::where('email', $request->email)->first();

        $user->forceFill([
            'password' => Hash::make($request->password),
            'remember_token' => Str::random(60),
        ])->save();
    }
}
