<?php

namespace App\Http\Controllers;

use App\Models\w_company;
use Illuminate\Http\Request;

class MyPageController extends Controller
{
    //パラメータから取得した企業IDを元にプロフィールのデータを取得するメソッド
    public function c_mypage_get(Request $request, $id)
    {
        $company_mypage = w_company::where('id', $id)->first();

        // データが存在する場合
        if ($company_mypage) {
            return response()->json($company_mypage);
        } else {
            return response()->json(['error' => 'プロフィールが見つかりませんでした。'], 404);
        }
    }
}
