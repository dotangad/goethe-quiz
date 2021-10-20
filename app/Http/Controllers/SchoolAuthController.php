<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Validation\Rule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SchoolAuthController extends Controller
{
  private function timeCheck()
  {
    return (\Carbon\Carbon::now('Asia/Kolkata'))
      ->gt(\Carbon\Carbon::parse(env('REG_DATE')));
  }

  public function loginShow()
  {
    return Inertia::render('auth/school_login');
  }

  public function login(Request $request)
  {
    $body = $request->validate([
      'email' => 'required|email',
      'password' => 'required|min:8|max:24',
    ]);

    $user = User::where([
      ['type', '!=', 'team'],
      ['email', '=', $body['email']],
    ])->first();

    if (!$user) {
      return Inertia::render('auth/school_login', ['error' => 'An account with that email does not exist']);
    }

    if (!Hash::check($body['password'], $user->password)) {
      return Inertia::render('auth/school_login', ['error' => 'Incorrect password']);
    }

    Auth::login($user, true);

    return redirect('/');
  }

  public function registerShow()
  {
    if (!$this->timeCheck()) return redirect('/');
    return Inertia::render('auth/school_register');
  }

  public function register(Request $request)
  {
    $body = $request->validate([
      'email' => 'required|email',
      'password' => 'required|min:8|max:24',
      'confirm-password' => 'required|same:password',

      'name' => 'required',
      'principal' => 'required',
      'principal_mobile' => ['required', 'digits:10'],
      'teacher_incharge' => 'required',
      'teacher_incharge_email' => ['required', 'email'],
      'teacher_incharge_mobile' => ['required', 'digits:10'],
      'postal_code' => ['required', 'digits:6'],
      'address' => 'required',
    ]);

    $user = new User($body);
    $user->password = Hash::make($user->password);
    $user->save();

    Auth::login($user, true);
    return redirect("/");
  }
}
