<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class GameLogic extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::table('users', function (Blueprint $table) {
      $table->timestamp('last_solved')->useCurrent();
      $table->integer('points')->default(0);
      $table
        ->foreignId('question_id')
        ->nullable()
        ->references('id')
        ->on('questions')
        ->onDelete('set null');
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::table('users', function (Blueprint $table) {
      $table->dropColumn('last_solved');
      $table->dropColumn('points');
      $table->dropColumn('question_id');
    });
  }
}
