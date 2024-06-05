<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ListController;
use App\Http\Controllers\login\loginController;
use App\Http\Controllers\register\pre_registerController;
use App\Http\Controllers\register\preRegisterCheckController;


// トップ画面
Route::get('/', function () {
    return view('welcome');
});

// /list
// Route::get('list',[ListController::class, 'index']);

Route::get('/s_pre_register_check',[preRegisterCheckController::class, 'preRegisterCheckController']);

Route::get('/list',[ListController::class, 'DB_connection']);
Route::post('/list',[ListController::class, 'DB_connection']);

Route::get('/s_login',[loginController::class, 'loginController']);
Route::get('/s_pre_register',[pre_registerController::class, 'pre_registerController']);

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
