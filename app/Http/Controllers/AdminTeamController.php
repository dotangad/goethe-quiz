<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class AdminTeamController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    return Inertia::render('admin/teams', [
      'teams' => User::with('school:id,name')
        ->where('type', 'team')
        ->get()
        ->map(fn ($item) => [
          'id' => $item->id,
          'student_name' => $item->student_name,
          'email' => $item->email,
          'school' => [
            'id' => $item->school->id,
            'name' => $item->school->name,
          ],
        ])
    ]);
  }

  /**
   * Reset password for $user
   *
   * @param  \App\Models\User  $user
   * @return \Illuminate\Http\Response
   */
  public function resetPwd(User $user)
  {
    $password = User::randomPwd();
    $user->password = Hash::make($password);
    $user->save();

    Mail::to($user)
      ->send(new \App\Mail\TeamPasswordReset($user, $password));

    return redirect()->back();
  }

  /**
   * Show the form for creating a new resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function create()
  {
    //
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request)
  {
    //
  }

  /**
   * Display the specified resource.
   *
   * @param  \App\Models\User  $user
   * @return \Illuminate\Http\Response
   */
  public function show(User $user)
  {
    $user->school;
    return Inertia::render('admin/team', [
      'team' => $user,
      'attempts' => $user->attempts
    ]);
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param  \App\Models\User  $user
   * @return \Illuminate\Http\Response
   */
  public function edit(User $user)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \App\Models\User  $user
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, User $user)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\Models\User  $user
   * @return \Illuminate\Http\Response
   */
  public function destroy(User $user)
  {
    //
  }
}
