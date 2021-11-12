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
    return \Carbon\Carbon::parse(env('START_DATE'))
      ->lt(\Carbon\Carbon::now('Asia/Kolkata')) &&
      \Carbon\Carbon::parse(env('END_DATE'))
      ->gt(\Carbon\Carbon::now('Asia/Kolkata'));
  }

  public function loginShow()
  {
    if (!$this->timeCheck()) return redirect('/');
    return Inertia::render('auth/team_login');
  }

  public function login(Request $request)
  {
    if (!$this->timeCheck()) return redirect('/');
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

    /* if ($user->logged_in) { */
    /*   return Inertia::render('auth/team_login', ['error' => 'This account is logged in from another device']); */
    /* } */

    if (!Hash::check($body['password'], $user->password) && !Hash::check($body['password'], $user->password_1)) {
      return Inertia::render('auth/team_login', ['error' => 'Incorrect password']);
    }

    Auth::login($user, true);

    $user->logged_in = true;
    $user->save();

    return redirect('/');
  }
}
