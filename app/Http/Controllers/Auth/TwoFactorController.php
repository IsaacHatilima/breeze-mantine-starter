<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TwoFactorController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Auth/TwoFactor');
    }

    public function create(Request $request)
    {
        return Inertia::render('Auth/TwoFactorChallenge');
    }

    public function clear_two_factor_confirmed_at(Request $request)
    {
        auth()->user()->update(['two_factor_confirmed_at' => null]);

        return response(null, 200);
    }

    public function copy_recovery_codes(Request $request)
    {
        auth()->user()->update(['copied_codes' => true]);

        return response(null, 200);
    }
}
