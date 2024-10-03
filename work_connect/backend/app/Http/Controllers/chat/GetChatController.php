<?php

namespace App\Http\Controllers\chat;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\w_follow;
use App\Models\w_users;
use App\Models\w_company;
use Illuminate\Support\Facades\Log;


class GetChatController extends Controller
{

    public function GetChatController(Request $request)
    {
        try {
            // Reactからログイン中のidを取得
            $MyUserId = $request->input('MyUserId');
            $PairUserId = $request->input('PairUserId');

            \Log::info('MyUserIdは: ' . $MyUserId);
            \Log::info('PairUserIdは: ' . $PairUserId);


            // if(){
            //     // Reactに返す
            //     return response()->json();
            // }

        } catch (\Exception $e) {
            Log::error('GetCompanyListController: エラー', ['exception' => $e]);

            // エラーメッセージをJSON形式で返す
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
