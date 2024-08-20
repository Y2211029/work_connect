<?php

namespace App\Http\Controllers\search;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\w_users;

class SearchStudentController extends Controller
{
    /* 学生の検索処理 */
    public function SearchStudentController(Request $request)
    {
        try {
            $page = (int) $request->query('page', 1);
            $perPage = 20; //一ページ当たりのアイテム数
            // すでに取得したデータをスキップするためのオフセット計算
            $offset = ($page - 1) * $perPage;

            // 検索文字列を取得
            $searchText = $request->input('searchText', "");

            // 絞り込まれた希望職種を配列で取得
            $desired_occupation_array = $request->input('desired_occupation', []);
            // 絞り込まれた希望勤務地を配列で取得
            $desired_work_region_array = $request->input('desired_work_region', []);
            // 絞り込まれたプログラミング言語を配列で取得
            $student_programming_language_array = $request->input('student_programming_language', []);
            // 絞り込まれた開発環境を配列で取得
            $student_development_environment_array = $request->input('student_development_environment', []);
            // 絞り込まれたソフトウェアを配列で取得
            $software_array = $request->input('software', []);
            // 絞り込まれた取得資格を配列で取得
            $acquisition_qualification_array = $request->input('acquisition_qualification', []);
            // 絞り込まれた趣味を配列で取得
            $hobby_array = $request->input('hobby', []);

            \Log::info('SearchStudentController:$student_programming_language_array:');
            \Log::info($student_programming_language_array);

            $query = w_users::query();

            $query->select(
                'w_users.*',
            );

            // 希望職種で絞り込み
            if (isset($desired_occupation_array)) {
                foreach ($desired_occupation_array as $desired_occupation) {
                    $query->where('w_users.desired_occupation', 'REGEXP', '(^|,)' . preg_quote($desired_occupation) . '($|,)');
                }
            }

            // 希望勤務地で絞り込み
            if (isset($desired_work_region_array)) {
                foreach ($desired_work_region_array as $desired_work_region) {
                    $query->where('w_users.desired_work_region', 'REGEXP', '(^|,)' . preg_quote($desired_work_region) . '($|,)');
                }
            }

            // プログラミング言語で絞り込み
            if (isset($student_programming_language_array)) {
                foreach ($student_programming_language_array as $student_programming_language) {
                    $query->where('w_users.programming_language', 'REGEXP', '(^|,)' . preg_quote($student_programming_language) . '($|,)');
                }
            }

            // 開発環境で絞り込み
            if (isset($student_development_environment_array)) {
                foreach ($student_development_environment_array as $student_development_environment) {
                    $query->where('w_users.development_environment', 'REGEXP', '(^|,)' . preg_quote($student_development_environment) . '($|,)');
                }
            }

            // ソフトウェアで絞り込み
            if (isset($software_array)) {
                foreach ($software_array as $software) {
                    $query->where('w_users.software', 'REGEXP', '(^|,)' . preg_quote($software) . '($|,)');
                }
            }

            // 取得資格で絞り込み
            if (isset($acquisition_qualification_array)) {
                foreach ($acquisition_qualification_array as $acquisition_qualification) {
                    $query->where('w_users.acquisition_qualification', 'REGEXP', '(^|,)' . preg_quote($acquisition_qualification) . '($|,)');
                }
            }

            // 趣味で絞り込み
            if (isset($hobby_array)) {
                foreach ($hobby_array as $hobby) {
                    $query->where('w_users.hobby', 'REGEXP', '(^|,)' . preg_quote($hobby) . '($|,)');
                }
            }
            $results = $query->skip($offset)
                ->take($perPage) //件数
                ->get();

            $resultsArray = json_decode(json_encode($results), true);

            \Log::info('SearchStudentController:$resultsArray:');
            \Log::info($resultsArray);

            return json_encode($resultsArray);

            // if (count($resultsArray) == 0) {
            //     return json_encode("検索結果0件");
            // } else {
            //     return json_encode($resultsArray);
            // }
        } catch (\Exception $e) {
            \Log::info('SearchStudentController:user_name重複チェックエラー');
            \Log::info($e);
            /*reactに返す*/
            return json_encode($e);
        }
    }
}
