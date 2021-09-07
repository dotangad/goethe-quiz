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
    // \App\Models\User::factory(10)->create();
    $user = new \App\Models\User([
      'type' => 'school',
      'email' => 'principal@dpsrkp.net',
      'password' => Hash::make('password')
    ]);
    $user->save();

    $schoolInfo = new \App\Models\SchoolInfo([
      'user_id' => $user->id,
      'name' => 'Delhi Public School, R.K. Puram',
      'principal' => 'Padma Srinivasan',
      'country' => 'India',
      'phone' => '+91 1234567890',
      'teacher_incharge' => 'Mukesh Kumar',
      'address' => 'Delhi Public School R. K. Puram, Sector-XII, R K Puram, New Delhi 110022 India'
    ]);
    $schoolInfo->save();
  }
}
