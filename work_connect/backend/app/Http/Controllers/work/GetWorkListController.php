<?php

namespace App\Http\Controllers\work;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\w_works;

class GetWorkListController extends Controller
{
    public function GetWorkListController(Request $request)
    {
        try {
            $page = (int) $request->query('page', 1);
            $perPage = 20; //一ページ当たりのアイテム数
            // すでに取得したデータをスキップするためのオフセット計算
            $offset = ($page - 1) * $perPage;

            $sortOption = $request->query('sort');



            $workList = w_works::select(
                'w_works.*',
                'w_users.user_name',
                'w_users.icon',
                'w_users.programming_language AS users_programming_language',
                'w_users.development_environment AS users_development_environment',
                'w_users.other AS users_other',

            )
                ->join('w_users', 'w_works.creator_id', '=', 'w_users.id');

            if ($sortOption === 'orderNewPostsDate') {
                $workList->orderBy('w_works.created_at', 'desc');
            }
            if ($sortOption === 'orderOldPostsDate') {
                $workList->orderBy('w_works.created_at', 'asc');
            }

            $workList = $workList->skip($offset)
                ->take($perPage) //件数
                ->get();
                
            $workListArray = json_decode(json_encode($workList), true);

            // レスポンスに全体のアイテム数を含める
            // $response = [
            //     'totalItems' => $totalItems,
            //     'workList' => $workListArray
            // ];


            \Log::info('GetWorkListController:$response:');
            \Log::info(json_encode($workListArray));
            \Log::info('GetWorkListController:$sortOption:');
            \Log::info(json_encode($sortOption));
            // echo json_encode($response);
            return json_encode($workListArray);
        } catch (\Exception $e) {
            \Log::info('GetWorkListController:user_name重複チェックエラー');
            \Log::info($e);
            /*reactに返す*/
            echo json_encode($e);
        }
    }
}
