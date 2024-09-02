<?php

namespace App\Http\Middleware;

use Closure;

class VerifyCsrfToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        // LaravelのCSRFトークン検証を無効化
        return $next($request);
    }
<<<<<<< HEAD

=======
>>>>>>> a8f81805d7881191f4c8b687c9cc54c98922b3f3
}
