<?php

namespace App\Http\Controllers\search;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\w_movies;

class SearchVideoController extends Controller
{
    /* 動画の検索処理 */
    public function SearchVideoController(Request $request)
    {
        try {
            $page = (int) $request->query('page', 1);
            $perPage = 20; //一ページ当たりのアイテム数
            // すでに取得したデータをスキップするためのオフセット計算
            $offset = ($page - 1) * $perPage;

            $sortOption = $request->query('sort');

            // 検索文字列を取得
            $searchText = $request->input('searchText', "");

            // 絞り込まれた動画ジャンルを配列で取得
            $video_genre_array = $request->input('video_genre', []);

            \Log::info('GetVideoListController:$video_genre_array:');
            \Log::info($video_genre_array);

            $query = w_movies::query();

            $query->select(
                'w_users.*',
                'w_movies.*',
            );

            // 動画ジャンルで絞り込み
            if (isset($video_genre_array)) {
                foreach ($video_genre_array as $video_genre) {
                    $query->where('w_movies.genre', 'REGEXP', '(^|,)' . preg_quote($video_genre) . '($|,)');
                }
            }

            $query->join('w_users', 'w_movies.creator_id', '=', 'w_users.id');

            if ($sortOption === 'orderNewPostsDate') {
                $query->orderBy('w_movies.created_at', 'desc');
            }
            if ($sortOption === 'orderOldPostsDate') {
                $query->orderBy('w_movies.created_at', 'asc');
            }
            $results = $query->skip($offset)
                ->take($perPage) //件数
                ->get();

            $resultsArray = json_decode(json_encode($results), true);

            \Log::info('SearchVideoController:$resultsArray:');
            \Log::info($resultsArray);
            \Log::info('SearchVideoController:$sortOption:');
            \Log::info($sortOption);

            return json_encode($resultsArray);
            // if (count($resultsArray) == 0) {
            //     return json_encode("検索結果0件");
            // } else {
            //     return json_encode($resultsArray);
            // }
        } catch (\Exception $e) {
            \Log::info('SearchVideoController:user_name重複チェックエラー');
            \Log::info($e);
            /*reactに返す*/
            return json_encode($e);
        }
    }
}
