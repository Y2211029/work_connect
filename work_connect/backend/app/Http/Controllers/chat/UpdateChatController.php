<?php

namespace App\Http\Controllers\chat;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\w_chat;
use Illuminate\Support\Facades\Log;


class UpdateChatController extends Controller
{

    public function UpdateChatController(Request $request)
    {
        try {
            // ReactからidとDataを取得
            $Id = $request->input('Id');
            $Data = $request->input('Data');

            w_chat::where('id', $Id)
            ->update(['message' => $Data]); // 内容を更新

            // Reactに返す
            return response()->json("succuses");


        } catch (\Exception $e) {
            Log::error('GetCompanyListController: エラー', ['exception' => $e]);

            // エラーメッセージをJSON形式で返す
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
