<?php

namespace App\Http\Controllers\search;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\w_works;

class SearchWorkController extends Controller
{
    /* 作品の検索処理 */
    public function SearchWorkController(Request $request)
    {
        try {
            // 検索文字列を取得
            $searchText = $request->input('searchText', "");
            
            // 絞り込まれた作品ジャンルを配列で取得
            $work_genre_array = $request->input('work_genre', []);
            // 絞り込まれたプログラミング言語を配列で取得
            $programming_language_array = $request->input('programming_language', []);
            // 絞り込まれた開発環境を配列で取得
            $development_environment_array = $request->input('development_environment', []);

            \Log::info('GetWorkListController:$work_genre_array:');
            \Log::info($work_genre_array);

            $query = w_works::query();

            $query->select(
                'w_users.programming_language AS users_programming_language',
                'w_users.development_environment AS users_development_environment',
                'w_users.other AS users_other',

                'w_users.*',
                'w_works.*',
            );

            // 作品ジャンルで絞り込み
            if (isset($work_genre_array)) {
                foreach ($work_genre_array as $work_genre) {
                    $query->where('w_works.work_genre', 'REGEXP', '(^|,)' . preg_quote($work_genre) . '($|,)');
                }
            }

            // プログラミング言語で絞り込み
            if (isset($programming_language_array)) {
                foreach ($programming_language_array as $programming_language) {
                    $query->where('w_works.programming_language', 'REGEXP', '(^|,)' . preg_quote($programming_language) . '($|,)');
                }
            }

            // 開発環境で絞り込み
            if (isset($development_environment_array)) {
                foreach ($development_environment_array as $development_environment) {
                    $query->where('w_works.development_environment', 'REGEXP', '(^|,)' . preg_quote($development_environment) . '($|,)');
                }
            }

            $query->join('w_users', 'w_works.creator_id', '=', 'w_users.id');

            $results = $query->get();

            $resultsArray = json_decode(json_encode($results), true);

            \Log::info('SearchWorkController:$resultsArray:');
            \Log::info($resultsArray);

            if (count($resultsArray) == 0) {
                return json_encode("検索結果0件");
            } else {
                return json_encode($resultsArray);
            }
        } catch (\Exception $e) {
            \Log::info('SearchWorkController:user_name重複チェックエラー');
            \Log::info($e);
            /*reactに返す*/
            return json_encode($e);
        }
    }
}
