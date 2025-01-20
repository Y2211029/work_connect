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

            $userName = $request->query('userName');



            $workList = w_works::select(
                'w_works.*',
                'w_users.user_name',
                'w_users.icon',
                'w_users.programming_language AS users_programming_language',
                'w_users.development_environment AS users_development_environment',
                'w_users.other AS users_other',
            )
                ->join('w_users', 'w_works.creator_id', '=', 'w_users.id');

            if ($userName !== null) {
                // `userName` が指定されている場合のみフィルタリング
                $workList->where('w_users.user_name', $userName);
            }


            if ($sortOption === 'orderNewPostsDate') {
                $workList->orderBy('w_works.created_at', 'desc');
            }
            if ($sortOption === 'orderOldPostsDate') {
                $workList->orderBy('w_works.created_at', 'asc');
            }

            $totalItems = $workList->count();

            $workList = $workList->skip($offset)
                ->take($perPage) //件数
                ->get();

            $message = null;
            if ($page == 1 && $totalItems === 0) {
                $message = "0件です。";
            }

            return response()->json([
                'list' => $workList,
                'count' => $totalItems,
                'message' => $message,
            ]);

            \Log::info('GetWorkListController:$response:');
            \Log::info(json_encode($workList));
            \Log::info('GetWorkListController:$:');
            \Log::info(json_encode($sortOption));
            \Log::info('GetWorkListController:$:totalItems');
            \Log::info(json_encode($totalItems));

            return json_encode($workList);
        } catch (\Exception $e) {
            \Log::info('GetWorkListController:user_name重複チェックエラー');
            \Log::info($e);
            /*reactに返す*/
            echo json_encode($e);
        }
    }
}
