<?php

use App\Http\Controllers\movie\PostMovieCommentDeleteController;
use App\Http\Controllers\movie\PostMovieCommentPostController;
use App\Http\Controllers\movie\PostMovieCommentSaveController;
use App\Http\Controllers\work\PostWorkCommentPostController;
use App\Http\Controllers\work\PostWorkCommentSaveController;
use App\Http\Controllers\work\PostWorkCommentDeleteController;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ListController;
use App\Http\Controllers\EditorController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\login\loginController;
use App\Http\Controllers\login\LoginStatusCheckController;
use App\Http\Controllers\register\pre_registerController;
use App\Http\Controllers\register\preRegisterCheckController;
use App\Http\Controllers\register\registerController;
use App\Http\Controllers\register\userNameCheckController;
use App\Http\Controllers\work\GetWorkListController;
use App\Http\Controllers\movie\GetMovieListController;
use App\Http\Controllers\work\GetWorkDetailController;
use App\Http\Controllers\movie\GetMovieDetailController;
use App\Http\Controllers\student\GetStudentListController;
use App\Http\Controllers\company\GetCompanyListController;
use App\Http\Controllers\follow\FollowController;
use App\Http\Controllers\tag\InsertTagController;
use App\Http\Controllers\tag\GetGenreTagController;
use App\Http\Controllers\tag\GetLanguageTagController;
use App\Http\Controllers\tag\GetEnvironmentTagController;
use App\Http\Controllers\movie\VideoPostingController;
use App\Http\Controllers\tag\GetVideoGenreTagController;
use App\Http\Controllers\tag\GetStudentProgrammingLanguageTagController;
use App\Http\Controllers\tag\GetStudentDevelopmentEnvironmentTagController;
use App\Http\Controllers\tag\GetSoftwareTagController;
use App\Http\Controllers\tag\GetAcquisitionQualificationTagController;
use App\Http\Controllers\tag\GetHobbyTagController;
use App\Http\Controllers\tag\GetDesiredOccupationTagController;
use App\Http\Controllers\tag\GetDesiredWorkRegionTagController;
use App\Http\Controllers\tag\GetSelectedOccupationTagController;
use App\Http\Controllers\tag\GetPrefectureTagController;
use App\Http\Controllers\work\WorkPostingController;
use App\Http\Controllers\search\SearchWorkController;
use App\Http\Controllers\search\SearchVideoController;
use App\Http\Controllers\search\SearchStudentController;
use App\Http\Controllers\search\SearchCompanyController;
use App\Http\Controllers\profile\GetMypageController;
use App\Http\Controllers\profile\PostMypageController;
use App\Http\Controllers\profile\GetMypageKindController;


// トップ画面
Route::get('/', function () {
    return view('welcome');
});

// /list
// Route::get('list',[ListController::class, 'index']);
// =======

// プロフィールのマイページ(get)
Route::get('/get_profile_mypage', [GetMypageController::class, 'GetMypageController']);
// プロフィールのマイページ(post)
Route::post('/post_profile_mypage', [PostMypageController::class, 'PostMypageController']);
// プロフィールのマイページルーティング設定(get)
Route::get('/get_profile_mypage_kind', [GetMypageKindController::class, 'GetMypageKindController']);

/* 検索 */
// 作品検索
Route::get('/search_work', [SearchWorkController::class, 'SearchWorkController']);
// 動画検索
Route::get('/search_video', [SearchVideoController::class, 'SearchVideoController']);
// 学生検索
Route::get('/search_student', [SearchStudentController::class, 'SearchStudentController']);
// 企業検索
Route::get('/search_company', [SearchCompanyController::class, 'SearchCompanyController']);

/* タグ関係 */
// タグ作成
Route::post('/insert_tag', [InsertTagController::class, 'InsertTagController']);
// 作品ジャンルタグ取得
Route::get('/get_work_genre_tag', [GetGenreTagController::class, 'GetGenreTagController']);
// 作品のプログラミング言語タグ取得
Route::get('/get_work_language_tag', [GetLanguageTagController::class, 'GetLanguageTagController']);
// 作品の開発環境タグ取得
Route::get('/get_work_environment_tag', [GetEnvironmentTagController::class, 'GetEnvironmentTagController']);
// 動画ジャンルタグ取得
Route::post('/video_posting', [VideoPostingController::class, 'VideoPostingController']);
// 動画ジャンルタグ取得
Route::get('/get_video_genre_tag', [GetVideoGenreTagController::class, 'GetVideoGenreTagController']);
// 学生のプログラミング言語タグ取得
Route::get('/get_student_programming_language_tag', [GetStudentProgrammingLanguageTagController::class, 'GetStudentProgrammingLanguageTagController']);
// 学生の開発環境タグ取得
Route::get('/get_student_development_environment_tag', [GetStudentDevelopmentEnvironmentTagController::class, 'GetStudentDevelopmentEnvironmentTagController']);
// ソフトウェアタグ取得
Route::get('/get_software_tag', [GetSoftwareTagController::class, 'GetSoftwareTagController']);
// 取得資格タグ取得
Route::get('/get_acquisition_qualification_tag', [GetAcquisitionQualificationTagController::class, 'GetAcquisitionQualificationTagController']);
// 趣味タグ取得
Route::get('/get_hobby_tag', [GetHobbyTagController::class, 'GetHobbyTagController']);
// 学生の希望職種タグ取得
Route::get('/get_desired_occupation_tag', [GetDesiredOccupationTagController::class, 'GetDesiredOccupationTagController']);
// 学生の希望職種タグ取得
Route::get('/get_desired_work_region_tag', [GetDesiredWorkRegionTagController::class, 'GetDesiredWorkRegionTagController']);
// 企業の職種タグ取得
Route::get('/get_selected_occupation_tag', [GetSelectedOccupationTagController::class, 'GetSelectedOccupationTagController']);
// 企業の勤務地タグ取得
Route::get('/get_prefecture_tag', [GetPrefectureTagController::class, 'GetPrefectureTagController']);


// 作品投稿
Route::post('/work_posting', [WorkPostingController::class, 'store']);
// ログイン状態のチェック
Route::post('/login_status_check', [LoginStatusCheckController::class, 'LoginStatusCheckController']);

// 作品一覧取得
Route::get('/get_work_list', [GetWorkListController::class, 'GetWorkListController']);
// 動画一覧取得
Route::get('/get_movie_list', [GetMovieListController::class, 'GetMovieListController']);
// 学生一覧取得
Route::get('/get_student_list', [GetStudentListController::class, 'GetStudentListController']);
// 企業一覧取得
Route::get('/get_company_list', [GetCompanyListController::class, 'GetCompanyListController']);

// 作品詳細取得
Route::get('/get_work_detail', [GetWorkDetailController::class, 'GetWorkDetailController']);
// 動画詳細取得
Route::get('/get_movie_detail', [GetMovieDetailController::class, 'GetMovieDetailController']);
// // 学生詳細取得
// Route::get('/get_student_list',[GetStudentListController::class, 'GetStudentListController']);
// // 企業詳細取得
// Route::get('/get_company_list',[GetCompanyListController::class, 'GetCompanyListController']);
// >>>>>>> f74bb114622c2917b98d0449d67e8b7e25daac84

// 作品コメント投稿
Route::post('/post_work_comment_post', [PostWorkCommentPostController::class, 'PostWorkCommentPostController']);
// 作品コメント更新
Route::post('/post_work_comment', [PostWorkCommentSaveController::class, 'PostWorkCommentSaveController']);
// 作品コメント削除
Route::post('/post_work_comment_delete', [PostWorkCommentDeleteController::class, 'PostWorkCommentDeleteController']);

// 動画コメント投稿
Route::post('/post_movie_comment_post', [PostMovieCommentPostController::class, 'PostMovieCommentPostController']);
// 動画コメント更新
Route::post('/post_movie_comment', [PostMovieCommentSaveController::class, 'PostMovieCommentSaveController']);
// 動画コメント削除
Route::post('/post_movie_comment_delete', [PostMovieCommentDeleteController::class, 'PostMovieCommentDeleteController']);

// フォロー
Route::post('/follow', [FollowController::class, 'FollowController']);




Route::get('/user_name_check', [userNameCheckController::class, 'userNameCheckController']);

Route::get('/s_pre_register_check', [preRegisterCheckController::class, 'preRegisterCheckController']);

Route::get('/s_register', [registerController::class, 'registerController']);

Route::get('/list', [ListController::class, 'DB_connection']);
Route::post('/list', [ListController::class, 'DB_connection']);

Route::get('/s_login', [loginController::class, 'loginController']);
Route::get('/s_pre_register', [pre_registerController::class, 'pre_registerController']);


//ニュース編集・投稿・閲覧機能
Route::post('/news_save', [EditorController::class, 'news_save']);
Route::post('/news_upload', [EditorController::class, 'news_upload']);
Route::post('/thumbnail_image_save', [EditorController::class, 'thumbnail_image_save']);
Route::post('/contents_image_save', [EditorController::class, 'contents_image_save']);
Route::post('/contents_url_image_save', [EditorController::class, 'contents_url_image_save']);
Route::get('/news_draft_list/{id}', [EditorController::class, 'news_draft_list']);
Route::get('/Internship_JobOffer', [EditorController::class, 'editor_get']);
Route::get('/Internship_JobOffer/news_detail/{id}', [NewsController::class, 'news_detail_get']);
Route::post('/news_bookmark', [NewsController::class, 'news_bookmark']);
Route::get('/thumbnail_img_delete/{id}', [EditorController::class, 'thumbnail_img_delete']);


//設定機能
Route::get('/color_save', [SettingController::class, 'color_save']);


// ミドルウェア
Route::group(['middleware' => ['api', 'cors']], function () {
    Route::options('articles', function () {
        return response()->json();
    });
    Route::resource('articles', 'Api\ArticlesController');
});

// 新しいエンドポイントを作成し、CSRFトークンを返す
Route::get('/csrf-token', function () {
    return response()->json(['csrf_token' => csrf_token()]);
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::get('{any}', function () {

    return view('app');
})->where('any', '.*');
