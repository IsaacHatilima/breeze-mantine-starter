<?php

namespace App\Actions\Auth;

class UpdateProfileAction
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function update_profile($request)
    {
        $request->user()->firstname = ucwords($request->firstname);
        $request->user()->lastname = ucwords($request->lastname);
        $request->user()->email = strtolower($request->email);

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();
    }
}
