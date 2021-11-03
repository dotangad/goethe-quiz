<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class SendAuthDetails extends Command
{
  /**
   * The name and signature of the console command.
   *
   * @var string
   */
  protected $signature = 'send_auth_details';

  /**
   * The console command description.
   *
   * @var string
   */
  protected $description = 'Send passwords to users';

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
    $LIMIT = 80;
    $counter = 0;
    $users = User::all();
    $teams = $users->filter(function ($user) {
      return $user->type === 'team' && !$user->auth_details_sent;
    });

    foreach ($teams as $user) {
      $password = User::randomPwd();
      $user->password = Hash::make($password);
      $user->auth_details_sent = true;
      $user->save();
      Mail::to($user)->send(new \App\Mail\TeamCreatedMail($user, $password));

      $email = $user->email;
      $name = $user->student_name;
      $school = $users->first(function ($school) use ($user) {
        return $school->id == $user->school_id;
      })->name;

      $this->info("Details sent to $name <$email> from $school");

      $counter++;
      if ($counter === $LIMIT) break;
    }
  }
}
