<?php

namespace App\Http\Controllers;

use App\Models\w_users;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    // 色を変更する
    public function color_save(Request $request)
    {
        $color = $request->input('color');
        $colorType = $request->input('colorType');  // カラム名を取得する

        $id = "C_000000000002";

        // ユーザーをIDで検索する
        $user_color = w_users::where('id', $id)->first();

        // ユーザーが見つからない場合のエラーハンドリング
        if (!$user_color) {
            return response()->json(['error' => 'Record not found'], 404);
        }

        // カラム名に応じて色の値を更新して保存
        switch ($colorType) {
            case 'backgroundcolor':
                $user_color->background_color = $color;
                break;
            case 'fontcolor':
                $user_color->font_color = $color;
                break;
            default:
                return response()->json(['error' => 'Invalid color type'], 400);
        }

        $user_color->save();

        return response()->json(['message' => 'Color saved successfully', 'color' => $color , 'colortype' => $colorType]);
    }
}