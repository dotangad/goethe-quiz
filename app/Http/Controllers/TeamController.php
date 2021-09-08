<?php

namespace App\Http\Controllers;

use App\Models\TeamInfo;
use App\Models\User;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class TeamController extends Controller
{
  public function create(Request $request)
  {
    if (
      \Carbon\Carbon::parse(env('END_DATE'))
      ->lt(\Carbon\Carbon::now('Asia/Kolkata'))
    ) return redirect('/dashboard');

    $body = $request->validate([
      'email' => 'required|email',
      'student_1' => 'required',
      'student_2' => 'required',
    ]);

    $user = User::where([
      ['type', '=', 'team'],
      ['email', '=', $body['email']],
    ])->first();

    if ($user) {
      return redirect('/');
    }

    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $password = '';
    for ($i = 0; $i < 15; $i++) {
      $password = $password . $characters[rand(0, strlen($characters))];
    }
    $user = new User([
      'type' => 'team',
      'email' => $body['email'],
      'password' => Hash::make($password),
    ]);
    try {
      $user->save();
    } catch (QueryException $e) {
      return redirect('/');
    }

    $teamInfo = new TeamInfo([
      'email' => $body['email'],
      'student_1' => $body['student_1'],
      'student_2' => $body['student_2'],
      'user_id' => $user->id,
      'school_id' => User::find(Auth::user()->id)->schoolInfo->id,
    ]);
    $teamInfo->save();


    Mail::to($user)
      ->send(new \App\Mail\TeamCreatedMail($user, $password));

    return redirect("/");
  }

  public function destroy(User $team)
  {
    if (
      \Carbon\Carbon::parse(env('START_DATE'))
      ->lt(\Carbon\Carbon::now('Asia/Kolkata'))
    ) return redirect('/dashboard');

    $team->delete();

    return redirect('/');
  }
}
