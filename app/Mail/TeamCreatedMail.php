<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use \App\Models\User;

class TeamCreatedMail extends Mailable
{
  use Queueable, SerializesModels;

  /**
   * The user (team) the email is being sent to
   * @var \App\Models\User
   */
  public $user;

  /**
   * Create a new message instance.
   *
   * @return void
   */
  public function __construct(User $user)
  {
    $this->user = $user;
  }

  /**
   * Build the message.
   *
   * @return $this
   */
  public function build()
  {
    return $this->subject('Registered for DPS Goethe Quiz')
      ->view('mail.team_created')
      ->with([
        'user' => $this->user,
      ]);
  }
}
