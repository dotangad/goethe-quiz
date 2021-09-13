<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class NotEnded
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
      ->lt(\Carbon\Carbon::parse(env('END_DATE')))
    ) return $next($request);

    return redirect('/');
  }
}