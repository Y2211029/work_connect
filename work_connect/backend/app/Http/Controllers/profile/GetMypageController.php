<?php

namespace App\Http\Controllers\profile;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\w_users;
use App\Models\w_company;
use App\Models\w_company_information;

class GetMypageController extends Controller
{
    public function GetMypageController(Request $request)
    {
        try {
            // ProfileUserNameを取得
            $profileId = $request->input('ProfileUserName');
            $userList = w_users::where('user_name', $profileId)->get();
            //$userListArray = json_decode(json_encode($userList), true);
            \Log::info($userList);

            return json_encode($userList);
        } catch (\Exception $e) {
            \Log::info('GetMypageController:user_name重複チェックエラー');
            \Log::info($e);

            /*reactに返す*/
            echo json_encode($e);
        }
    }

    public function c_mypage_get(Request $request, $id)
    {
        // ID でデータを取得
        $company_mypage = w_company::where('id', $id)->first();

        // company_id と public_status の条件でデータを取得
        $company_information = w_company_information::where('company_id', $id)
            ->where('public_status', 1)
            ->get();

        // データが存在する場合
        if ($company_mypage) {
            $response = [
                'company_mypage' => $company_mypage,
                'company_flag' => $company_information->isNotEmpty() ? 2 : 1,
            ];

            if ($company_information->isNotEmpty()) {
                $response['company_information'] = $company_information;
            }

            return response()->json($response);
        } else {
            return response()->json(['error' => 'プロフィールが見つかりませんでした。'], 404);
        }
    }
}
