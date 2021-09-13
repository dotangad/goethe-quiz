<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use \Carbon\Carbon as Carbon;
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

    $password = User::randomPwd();
    $user = new User([
      'type' => 'team',
      'email' => $body['email'],
      'password' => Hash::make($password),
      'student_1' => $body['student_1'],
      'student_2' => $body['student_2'],
      'school_id' => User::find(Auth::user()->id)->id,
      'question_id' => 1,
      'logged_in' => false
    ]);
    try {
      $user->save();
    } catch (QueryException $e) {
      return redirect('/');
    }

    Mail::to($user)
      ->send(new \App\Mail\TeamCreatedMail($user, $password));

    return redirect("/");
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \App\Models\User  $team
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, User $team)
  {
    $body = $request->validate([
      'student_1' => 'required',
      'student_2' => 'required',
    ]);

    User::where('id', $team->id)
      ->update(
        collect($body)
          ->only(['student_1', 'student_2'])
          ->toArray()
      );

    return redirect()->back();
  }

  public function destroy(User $team)
  {
    $team->delete();

    return redirect('/');
  }
}
