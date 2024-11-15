<?php

namespace App\Actions\Auth;

use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Hash;

class RegisterAction
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function create_user($request)
    {
        $user = User::create([
            'firstname' => ucwords($request->firstname),
            'lastname' => ucwords($request->lastname),
            'email' => strtolower($request->email),
            'password' => Hash::make($request->password),
        ]);

        defer(fn () => event(new Registered($user)));

        return $user;
    }
}
