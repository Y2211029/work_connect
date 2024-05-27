<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ListController;
use App\Http\Controllers\login\newloginController;


// トップ画面
Route::get('/', function () {
    return view('welcome');
});

// /list
// Route::get('list',[ListController::class, 'index']);

Route::get('/list',[ListController::class, 'DB_connection']);
Route::post('/list',[ListController::class, 'DB_connection']);

Route::get('/s_login',[newloginController::class, 'loginController']);


// ミドルウェア
Route::group(['middleware' => ['api', 'cors']], function(){
    Route::options('articles', function() {
        return response()->json();
    });
    Route::resource('articles', 'Api\ArticlesController');
});

// 新しいエンドポイントを作成し、CSRFトークンを返す
Route::get('/csrf-token', function() {
    return response()->json(['csrf_token' => csrf_token()]);
});


Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::get('{any}', function () {

    return view('app');

})->where('any','.*');
