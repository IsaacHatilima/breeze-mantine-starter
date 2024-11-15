<?php

namespace App\Http\Controllers\Auth;

use App\Actions\Auth\SetPasswordAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\SetPasswordRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class NewPasswordController extends Controller
{
    private SetPasswordAction $setPasswordAction;

    public function __construct(SetPasswordAction $setPasswordAction)
    {
        $this->setPasswordAction = $setPasswordAction;
    }

    /**
     * Display the password reset view.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('Auth/ResetPassword', [
            'email' => $request->email,
            'token' => $request->route('token'),
        ]);
    }

    /**
     * Handle an incoming new password request.
     *
     * @throws ValidationException
     */
    public function store(SetPasswordRequest $request): RedirectResponse
    {
        $this->setPasswordAction->set_password($request);

        return redirect()->route('login')->with('status', 'Your password has been changed.');
    }
}
