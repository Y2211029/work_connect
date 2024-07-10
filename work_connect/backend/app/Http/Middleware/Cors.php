<?php

namespace App\Http\Middleware;

use Closure;

class Cors
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     * @return mixed
     */

    public function handle($request, Closure $next)
    {

        return $next($request)
            ->header('Access-Control-Allow-Origin', '*')
            // ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            ->header('Access-Control-Allow-Methods', '*')
            // ->header('Access-Control-Allow-Headers', 'Content-Type, X-CSRF-TOKEN');
            ->header('Access-Control-Allow-Headers', '*');
    }

    // public function handle(Request $request, Closure $next): Response
    // {
    //     return $next($request);
    // }
}

