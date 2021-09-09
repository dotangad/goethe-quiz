<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
  /**
   * Seed the application's database.
   *
   * @return void
   */
  public function run()
  {
    \App\Models\User::factory()->count(50)->create();
    $u = \App\Models\User::find(rand(1, 50));
    $u->email = 'principal@dpsrkp.net';
    $u->name = 'Delhi Public School, R.K. Puram';
    $u->save();

    $u->teams[0]->email = 'team1@dpsrkp.net';
    $u->teams[1]->email = 'team2@dpsrkp.net';
    $u->teams[0]->save();
    $u->teams[1]->save();

    // Levels
    for ($i = 0; $i < 100; $i++) {
      (new \App\Models\Question([
        'text' => 'In which month does Oktoberfest start? Level ' . ($i + 1),
        'hint' => 'Hint for level ' . ($i + 1),
        'answer' => 'answer' . ($i + 1)
      ]))->save();
    }

    \App\Models\User::factory()->count(1)->admin('admin@dpsrkp.net', 'adminadmin')->create();
  }
}
