<?php

namespace App\Http\Controllers;

use App\Models\Question;
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
  private function regClosed()
  {
    return (\Carbon\Carbon::now('Asia/Kolkata'))->gt(\Carbon\Carbon::parse(env('REG_END_DATE')));
  }

  public function create(Request $request)
  {
    if ($this->regClosed()) return redirect()->back();
    $body = $request->validate([
      'email' => 'required|email',
      'student_name' => 'required',
      'student_mobile' => 'required|digits:10',
    ]);

    $user = User::where([
      ['type', '=', 'team'],
      ['email', '=', $body['email']],
    ])->first();

    if ($user) {
      return redirect()->back();
    }

    try {
      $password = User::randomPwd();
      $user = new User([
        'type' => 'team',
        'email' => $body['email'],
        'password' => Hash::make($password),
        'student_name' => $body['student_name'],
        'student_mobile' => $body['student_mobile'],
        'school_id' => User::find(Auth::user()->id)->id,
        'question_id' => Question::count() > 0 ? 1 : null,
        'logged_in' => false
      ]);

      $user->save();
    } catch (QueryException $e) {
      return redirect()->back();
    }

    // Mail::to($user)
    //   ->send(new \App\Mail\TeamCreatedMail($user, $password));
    // Mail::to($user)->send(new \App\Mail\TeamCreatedMail($user, $password));

    return redirect()->back();
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
    if ($this->regClosed()) return redirect()->back();
    $body = $request->validate([
      'student_name' => 'required',
      'student_mobile' => 'required|digits:10',
    ]);

    User::where('id', $team->id)
      ->update(
        collect($body)
          ->only(['student_name', 'student_mobile'])
          ->toArray()
      );

    return redirect()->back();
  }

  public function destroy(User $team)
  {
    if ($this->regClosed()) return redirect()->back();
    $team->delete();

    return redirect()->back();
  }
}
