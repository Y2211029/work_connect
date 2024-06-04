<?php

use App\Http\Middleware\Cors;

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->append(Cors::class);
        $middleware->validateCsrfTokens(except: [
            'http://localhost:5173',
            'http://localhost:5174',
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
