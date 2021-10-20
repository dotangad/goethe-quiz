<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LeaderboardController extends Controller
{
  public function index()
  {
    return Inertia::render('leaderboard', [
      'users' => User::with('school')
        ->where('type', 'team')
        ->orderBy('question_id', 'DESC')
        ->orderBy('last_solved', 'ASC')
        // ->get(['id', 'question_id', 'school', 'student_1', 'student_2'])
        ->get()
        ->map(function ($record) {
          return [
            'id' => $record->id,
            'question_id' => $record->question_id,
            'student_name' => $record->student_name,
            'school' => $record->school->name
          ];
        })
    ]);
  }
}
