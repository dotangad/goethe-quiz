<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class GenerateResetLink extends Command
{
  /**
   * The name and signature of the console command.
   *
   * @var string
   */
  protected $signature = 'generate_reset_link';

  /**
   * The console command description.
   *
   * @var string
   */
  protected $description = 'Generate reset password links for users';

  /**
   * Create a new command instance.
   *
   * @return void
   */
  public function __construct()
  {
    parent::__construct();
  }

  /**
   * Execute the console command.
   *
   * @return int
   */
  public function handle()
  {
    $users = User::all();
    $teams = $users->filter(function ($user) {
      return $user->type === 'team';
    });

    foreach ($teams as $user) {
      $user->reset_link = $user->randomLink();
      $user->save();
      $email = $user->email;
      $name = $user->student_name;
      $school = $users->first(function ($school) use ($user) {
        return $school->id == $user->school_id;
      })->name;

      $this->info("Generated for $name <$email> from $school");
    }
  }
}
