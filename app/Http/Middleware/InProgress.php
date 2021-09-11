<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use \Carbon\Carbon;

class InProgress
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
      Carbon::now()->between(
        Carbon::parse(env('START_DATE')),
        Carbon::parse(env('END_DATE'))
      )
    ) return $next($request);

    return redirect('/');
  }
}
