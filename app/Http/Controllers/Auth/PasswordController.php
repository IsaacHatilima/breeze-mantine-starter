<?php

namespace App\Http\Controllers\Auth;

use App\Actions\Auth\SetPasswordAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\ChangePasswordRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PasswordController extends Controller
{
    private SetPasswordAction $setPasswordAction;

    public function __construct(SetPasswordAction $setPasswordAction)
    {
        $this->setPasswordAction = $setPasswordAction;
    }

    public function edit(Request $request): Response
    {
        return Inertia::render('Auth/ChangePassword');
    }

    public function update(ChangePasswordRequest $request): RedirectResponse
    {
        $this->setPasswordAction->change_password($request);

        return back();
    }
}
