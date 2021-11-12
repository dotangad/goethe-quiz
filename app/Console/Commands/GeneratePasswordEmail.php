<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;

class GeneratePasswordEmail extends Command
{
  /**
   * The name and signature of the console command.
   *
   * @var string
   */
  protected $signature = 'generate_password_email';

  /**
   * The console command description.
   *
   * @var string
   */
  protected $description = 'Generates Password for email';

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
    $users = User::where('school_id', 1)->get();
    /* if (!$user) { */
    /*   $this->info("User doesn't exist"); */
    /*   return 1; */
    /* } */
    foreach ($users as $user) {
      $password = User::randomPwd();
      $user->password = Hash::make($password);
      $user->auth_details_sent = true;
      $user->save();
      $email = $user->email;
      $name = $user->student_name;

      $this->info("Password for $name <$email> is $password");
    }
  }
}
