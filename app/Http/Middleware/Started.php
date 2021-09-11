<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class Started
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
      (\Carbon\Carbon::parse(env('START_DATE')))
      ->lt(\Carbon\Carbon::now('Asia/Kolkata'))
    ) return $next($request);

    return redirect('/');
  }
}
