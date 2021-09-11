<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserAttemptsTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('user_attempts', function (Blueprint $table) {
      $table->id();
      $table->timestamps();

      $table->string('attempt');
      $table
        ->foreignId('question_id')
        ->references('id')
        ->on('questions')
        ->onDelete('cascade');
      $table
        ->foreignId('user_id')
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
    Schema::dropIfExists('user_attempts');
  }
}
