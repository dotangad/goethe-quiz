<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class TeamResetPassword extends Controller
{
  public function show($rand_string)
  {
    $user = User::where('reset_link', $rand_string)->first();

    if (!$user) {
      return Inertia::render('reset_password', ['error' => 'The link is invalid. Please check.']);
    }
    return Inertia::render('reset_password', ['user_reset_string' => $rand_string]);
  }

  public function reset_password(Request $request)
  {
    $str = $request->get('user_unique_string');

    $user = User::where('reset_link', $str)->first();

    if (!$user) {
      return Inertia::render('reset_password', ['error' => 'The link is invalid. Please check.']);
    }

    $password = User::randomPwd();
    $user->password_1 = Hash::make($password);
    $user->save();

    return Inertia::render('reset_password', ['new_password' => $password]);
  }
}
