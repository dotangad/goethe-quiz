<?php

namespace App\Http\Controllers;

use App\Models\TeamInfo;
use App\Models\User;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class TeamController extends Controller
{
  public function create(Request $request)
  {
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

    $user = new User([
      'type' => 'team',
      'email' => $body['email'],
      // TODO randomly generate and email
      'password' => Hash::make('password'),
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

    return redirect("/");
  }

  public function destroy(User $team)
  {
    $team->delete();

    return redirect('/');
  }
}
