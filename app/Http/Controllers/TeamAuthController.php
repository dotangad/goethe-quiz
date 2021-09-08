<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class TeamAuthController extends Controller
{
  private function timeCheck()
  {
    return \Carbon\Carbon::parse(env('START_DATE'))->subDays(2)
      ->lt(\Carbon\Carbon::now('Asia/Kolkata'));
  }

  public function loginShow()
  {
    if (!$this->timeCheck()) return redirect('/');
    return Inertia::render('auth/team_login');
  }

  public function login(Request $request)
  {
    $body = $request->validate([
      'email' => 'required|email',
      'password' => 'required|min:8|max:24',
    ]);

    $user = User::where([
      ['type', '=', 'team'],
      ['email', '=', $body['email']],
    ])->first();

    if (!$user) {
      return Inertia::render('auth/team_login', ['error' => 'A team with that email does not exist']);
    }

    if (!Hash::check($body['password'], $user->password)) {
      return Inertia::render('auth/team_login', ['error' => 'Incorrect password']);
    }

    Auth::login($user, true);

    return redirect('/');
  }
}