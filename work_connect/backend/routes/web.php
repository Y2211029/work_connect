<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ListController;
use App\Http\Controllers\EditorController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\login\loginController;
use App\Http\Controllers\register\pre_registerController;
use App\Http\Controllers\register\preRegisterCheckController;
use App\Http\Controllers\register\registerController;


// トップ画面
Route::get('/', function () {
    return view('welcome');
});

// /list
// Route::get('list',[ListController::class, 'index']);

Route::get('/s_pre_register_check',[preRegisterCheckController::class, 'preRegisterCheckController']);

Route::get('/s_register',[registerController::class, 'registerController']);

Route::get('/list',[ListController::class, 'DB_connection']);
Route::post('/list',[ListController::class, 'DB_connection']);

Route::get('/s_login',[loginController::class, 'loginController']);
Route::get('/s_pre_register',[pre_registerController::class, 'pre_registerController']);


//ニュース編集・投稿・閲覧機能
Route::get('/news_save',[EditorController::class, 'news_save']);
Route::get('/news_upload',[EditorController::class, 'news_upload']);
Route::post('/image_save',[EditorController::class, 'image_save']);
Route::get('/Internship_JobOffer',[EditorController::class, 'editor_get']);
Route::get('/Internship_JobOffer/news_detail/{id}', [NewsController::class, 'news_detail_get']);
Route::post('/news_bookmark',[NewsController::class, 'news_bookmark']);


//設定機能
Route::get('/color_save',[SettingController::class, 'color_save']);


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
