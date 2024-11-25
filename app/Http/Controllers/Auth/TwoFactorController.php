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

    public function clear_two_factor_confirmed_at(Request $request)
    {
        auth()->user()->update(['two_factor_confirmed_at' => null]);

        return response(null, 200);
    }
}
