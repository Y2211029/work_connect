<?php

namespace App\Http\Controllers\tag;

use App\Http\Controllers\Controller;
use App\Models\w_users;
use Illuminate\Http\Request;

class GetStudentSchoolNameTagController extends Controller
{
    public function GetStudentSchoolNameTagController(Request $request)
    {
        // JSONファイルを読み込む
        $jsonFilePath = storage_path('data/school_name_array.json'); // JSONファイルのパス
        $jsonData = file_get_contents($jsonFilePath);

        // JSON文字列を配列に変換
        $schoolArray = json_decode($jsonData, true);

        \Log::info('GetStudentSchoolNameTagController.php:$schoolArray:');
        \Log::info($schoolArray);

        // Eloquentを使って、w_usersテーブルに存在する学校名を取得
        $existingSchools = w_users::whereIn('school_name', $schoolArray)
            ->distinct()
            ->pluck('school_name')
            ->toArray();

        // JSONの配列とDBのデータで一致する学校名のみ新しい配列を作成
        $tag = array_intersect($schoolArray, $existingSchools);

        $tag = array_values($tag);
        
        \Log::info('GetStudentSchoolNameTagController.php:$tag:');
        \Log::info($tag);
        return json_encode($tag);
    }
}
