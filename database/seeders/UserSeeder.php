<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $u = new User([
            'name' => 'Admin',
            'email' => 'admin@dpsgoethequiz.com',
            'password' => Hash::make('randompwd'),
            'type' => 'admin'
        ]);
        $u->save();
        /* \App\Models\User::factory()->count(50)->create(); */
        /* $u = \App\Models\User::find(rand(1, 50)); */
        /* $u->email = 'principal@dpsrkp.net'; */
        /* $u->name = 'Delhi Public School, R.K. Puram'; */
        /* $u->save(); */

        /* $u->teams[0]->email = 'team1@dpsrkp.net'; */
        /* $u->teams[1]->email = 'team2@dpsrkp.net'; */
        /* $u->teams[0]->save(); */
        /* $u->teams[1]->save(); */
    }
}
