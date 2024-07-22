<?php

namespace App\Http\Controllers\movie;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\w_movie;

class GetMovieListController extends Controller
{
    public function GetMovieListController(Request $request)
    {
        try {
            $movieList = w_movie::select(
                'w_movies.*',
                'w_users.user_name',
            )->join('w_users', 'w_movies.creator_id', '=', 'w_users.id')->get();
            $movieListArray = json_decode(json_encode($movieList), true);

            \Log::info('GetMovieListController:$movieListArray:');
            \Log::info(json_encode($movieListArray));
            // echo json_encode($movieListArray);
            return json_encode($movieListArray);
        } catch (\Exception $e) {
            \Log::info('GetMovieListController:user_name重複チェックエラー');
            \Log::info($e);

            /*reactに返す*/
            echo json_encode($e);
        }
    }
}
