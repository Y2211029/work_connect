<?php

namespace App\Http\Controllers\movie;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\w_movie;

class GetMovieDetailController extends Controller
{
    public function GetMovieDetailController(Request $request)
    {
        $id = $request->input('id');
        try {
            $movieList = w_movie::join('w_users', 'w_movies.creator_id', '=', 'w_users.id')
                ->select(
                    'w_users.programming_language AS users_programming_language',
                    'w_users.development_environment AS users_development_environment',
                    'w_users.other AS users_other',

                    'w_users.*',
                    'w_movies.*',

                )->where('movie_id', $id)->get();

            \Log::info('GetMovieDetailController:$id:');
            \Log::info($id);

            \Log::info('GetMovieDetailController:$movieList[0]:');
            \Log::info(json_decode(json_encode($movieList[0]), true));
            
            return json_encode($movieList[0]);
        } catch (\Exception $e) {
            \Log::info('GetMovieDetailController:user_name重複チェックエラー');
            \Log::info($e);
            /*reactに返す*/
            echo json_encode($e);
        }
    }
}
