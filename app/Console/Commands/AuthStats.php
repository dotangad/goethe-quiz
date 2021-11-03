<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class AuthStats extends Command
{
  /**
   * The name and signature of the console command.
   *
   * @var string
   */
  protected $signature = 'auth_stats';

  /**
   * The console command description.
   *
   * @var string
   */
  protected $description = '';

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
    $schools = $users->filter(fn ($user) => $user->type === 'school')->count();
    $teams = $users->filter(fn ($user) => $user->type === 'team')->count();
    $sent = $users->filter(fn ($user) => $user->type === 'team' && $user->auth_details_sent)->count();
    $left = $teams - $sent;
    $this->info("Total schools: $schools");
    $this->info("Total teams: $teams");
    $this->info("Details sent to: $sent teams");
    $this->info("Left: $left teams");
  }
}
