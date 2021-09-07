<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTeamInfosTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('team_infos', function (Blueprint $table) {
      $table->id();
      $table->timestamps();
      $table->string('email');
      $table->string('student_1');
      $table->string('student_2');
      $table
        ->foreignId('user_id')
        ->nullable()
        ->unique()
        ->references('id')
        ->on('users')
        ->onDelete('cascade');
      $table
        ->foreignId('school_id')
        ->nullable()
        ->references('id')
        ->on('users')
        ->onDelete('cascade');
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('team_infos');
  }
}
