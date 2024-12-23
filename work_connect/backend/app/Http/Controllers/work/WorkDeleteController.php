<?php

namespace App\Http\Controllers\work;

use App\Models\w_images;
use App\Models\w_works;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;

class WorkDeleteController extends Controller
{
    public function store(Request $request ,$id)
    {

        \Log::info($id);

        // 作品データ削除
        $query = w_works::query();
        // データ保存 (例: DBに保存)
        $query->where("work_id", $id);
        $query->delete();

        // 画像データ削除
        $deleteQuery = w_images::query();
        $deleteQuery->where("work_id", $id);
        $deleteQuery->delete();

        // 元々の画像の削除
        $getQuery = w_images::query();
        $imageNameArray = [];
        $imageNameArray = $getQuery->select("w_images.image")->where("work_id", $id)->get();
        foreach ($imageNameArray as $value) {
            Storage::delete('public/images/work/'.$value);
            \Log::info('$value: '. $value);
        }

        return response()->json(['message' => 'Work data saved successfully'], 200);

    }
}
