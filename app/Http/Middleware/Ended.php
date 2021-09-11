<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class Ended
{
  /**
   * Handle an incoming request.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \Closure  $next
   * @return mixed
   */
  public function handle(Request $request, Closure $next)
  {
    if (
      (\Carbon\Carbon::now('Asia/Kolkata'))
      ->gt(\Carbon\Carbon::parse(env('END_DATE')))
    ) return $next($request);

    return redirect('/');
  }
}
