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
      'users' => array_merge(
        User::with('school')
          ->where('type', 'team')
          ->whereNull('question_id')
          ->orderBy('last_solved', 'ASC')
          ->get()
          ->map(function ($record) {
            return [
              'id' => $record->id,
              'question_id' => '-',
              'student_name' => $record->student_name,
              'points' => $record->points,
            ];
          })
          ->toArray(),
        User::with('school')
          ->where('type', 'team')
          ->where('question_id',  '>', 1)
          ->orderBy('points', 'DESC')
          ->orderBy('last_solved', 'ASC')
          // ->get(['id', 'question_id', 'student_name'])
          /* ->take(100) */
          ->get()
          ->map(function ($record) {
            return [
              'id' => $record->id,
              'question_id' => $record->question_id,
              'student_name' => $record->student_name,
              'points' => $record->points,
            ];
          })
          ->toArray()
      )
    ]);
  }
  public function leaderboard2()
  {
    return Inertia::render('leaderboard2', [
      'questions' => array_merge(
        [[
          'id' => '-',
          'text' => 'Finished quiz',
          'users_count' => User::where('type', 'team')->whereNull('question_id')->count()
        ]],
        Question::withCount(['users'])->get()->toArray()
      )
    ]);
  }
}
