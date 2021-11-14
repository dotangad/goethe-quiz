<?php

namespace App\Http\Controllers;

use App\Models\Question;
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
        ->where('question_id', '>', 1)
        ->orderBy('question_id', 'DESC')
        ->orderBy('last_solved', 'ASC')
        // ->get(['id', 'question_id', 'student_name'])
        /* ->take(100) */
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
  public function leaderboard2()
  {
    return Inertia::render('leaderboard2', [
      'questions' => Question::all()
        ->map(function ($record) {
          return [
            'id' => $record->id,
            'text' => $record->text,
            'number_of_people' => User::where('type', 'team')->where('question_id', $record->id)->count(),
          ];
        })
    ]);
  }
}
