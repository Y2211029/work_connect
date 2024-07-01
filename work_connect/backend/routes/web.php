<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ListController;
use App\Http\Controllers\EditorController;
use App\Http\Controllers\login\loginController;
use App\Http\Controllers\register\pre_registerController;
use App\Http\Controllers\register\preRegisterCheckController;
use App\Http\Controllers\register\registerController;
use App\Http\Controllers\register\userNameCheckController;
use App\Http\Controllers\work\GetWorkListController;
use App\Http\Controllers\movie\GetMovieListController;
use App\Http\Controllers\student\GetStudentListController;
use App\Http\Controllers\company\GetCompanyListController;


// トップ画面
Route::get('/', function () {
    return view('welcome');
});

// 作品一覧取得
Route::get('/get_work_list',[GetWorkListController::class, 'GetWorkListController']);
// 動画一覧取得
Route::get('/get_movie_list',[GetMovieListController::class, 'GetMovieListController']);
// 学生一覧取得
Route::get('/get_student_list',[GetStudentListController::class, 'GetStudentListController']);
// 企業一覧取得
Route::get('/get_company_list',[GetCompanyListController::class, 'GetCompanyListController']);

Route::get('/user_name_check',[userNameCheckController::class, 'userNameCheckController']);

Route::get('/s_pre_register_check',[preRegisterCheckController::class, 'preRegisterCheckController']);

Route::get('/s_register',[registerController::class, 'registerController']);

Route::get('/list',[ListController::class, 'DB_connection']);
Route::post('/list',[ListController::class, 'DB_connection']);

Route::get('/s_login',[loginController::class, 'loginController']);
Route::get('/s_pre_register',[pre_registerController::class, 'pre_registerController']);


//ニュース機能
Route::get('/news_upload',[EditorController::class, 'news_upload']);
Route::get('/news_save',[EditorController::class, 'news_save']);
Route::get('/Editor',[EditorController::class, 'editor_get']);
Route::get('/Internship_JobOffer',[EditorController::class, 'editor_get']);



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
