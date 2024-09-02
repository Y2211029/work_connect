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
            // Laravel側のURLの方を記述すればCSRFトークンの認証が通るようになりました
<<<<<<< HEAD
            'http://127.0.0.1:8000/*',
            'http://localhost:8000/*',
=======
            'http://localhost:8000/*',
            'http://127.0.0.1:8000/*',
>>>>>>> a8f81805d7881191f4c8b687c9cc54c98922b3f3
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();

