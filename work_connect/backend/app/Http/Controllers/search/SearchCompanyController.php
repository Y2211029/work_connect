<?php

namespace App\Http\Controllers\search;

use App\Http\Controllers\Controller;
use App\Models\w_company;
use Illuminate\Http\Request;

class SearchCompanyController extends Controller
{
    /* 企業の検索処理 */
    public function SearchCompanyController(Request $request)
    {
        try {
            // 検索文字列を取得
            $searchText = $request->input('searchText', "");
            
            // 絞り込まれた職種を配列で取得
            $selected_occupation_array = $request->input('selected_occupation', []);

            \Log::info('SearchCompanyController:$selected_occupation_array:');
            \Log::info($selected_occupation_array);

            $query = w_company::query();

            $query->select(
                'w_companies.*',
            );

            // 職種で絞り込み
            if (isset($selected_occupation_array)) {
                foreach ($selected_occupation_array as $selected_occupation) {
                    $query->where('w_companies.selected_occupation', 'REGEXP', '(^|,)' . preg_quote($selected_occupation) . '($|,)');
                }
            }

            $results = $query->get();

            $resultsArray = json_decode(json_encode($results), true);

            \Log::info('SearchVideoController:$resultsArray:');
            \Log::info($resultsArray);

            if (count($resultsArray) == 0) {
                return json_encode("検索結果0件");
            } else {
                return json_encode($resultsArray);
            }
        } catch (\Exception $e) {
            \Log::info('SearchVideoController:user_name重複チェックエラー');
            \Log::info($e);
            /*reactに返す*/
            return json_encode($e);
        }
    }
}
