<?php

namespace App\Http\Controllers\work;

use App\Models\w_images;
use App\Models\w_works;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;

class WorkEditController extends Controller
{
    public function store(Request $request, $id)
    {
        $WorkTitle = $request->input('WorkTitle');
        $WorkGenre = $request->input('WorkGenre');
        $YoutubeURL = $request->input('YoutubeURL');
        $Introduction = $request->input('Introduction');
        $Obsession = $request->input('Obsession');
        $Language = $request->input('Language');
        $Environment = $request->input('Environment');
        $images = $request->input('imagesName'); // 画像のバリデーション
        $imagesArray = $request->file('images');
        $annotation = $request->input('annotation');

        \Log::info($id);
        $pathArray = [];

        if (is_array($imagesArray) && count($imagesArray) > 0) {
            foreach ($imagesArray as $value) {
                // \Log::info('$value: ', $value);
                $pathArray[] = explode('/', $value->store('public/images/work'))[3];
                $mimeType = $value -> getMimeType();
                \Log::info('$mimeType: '. $mimeType);
            }
        } else {
            // エラーハンドリング：nullが渡された場合
            return response()->json(['error' => 'No images provided.'], 400);
        }

        // \Log::info('$pathArray: '. $pathArray);
        $annotation_json = json_encode($annotation);

        $query = w_works::query();
        // データ保存 (例: DBに保存)
        $query->where("work_id", $id);
        $query->update([
            'work_name' => $WorkTitle,
            'work_genre' => $WorkGenre,
            'youtube_url' => $YoutubeURL,
            'work_intro' => $Introduction,
            'obsession' => $Obsession,
            'programming_language' => $Language,
            'development_environment' => $Environment,
            'thumbnail' => $pathArray[0]
        ]);

        // 元々の画像の削除
        $getQuery = w_images::query();
        $imageNameArray = [];
        $imageNameArray = $getQuery->select("w_images.image")->where("work_id", $id)->get();
        foreach ($imageNameArray as $value) {
            Storage::delete('public/images/work/'.$value);
            \Log::info('$value: '. $value);
        }

        $deleteQuery = w_images::query();
        $deleteQuery->where("work_id", $id);
        $deleteQuery->delete();

        // 作成したw_worksのIDを取得
        foreach ($pathArray as $index => $data) {
            w_images::create([
                'image' => $data, // 'column_name'は実際のカラム名に変更
                'annotation' => $annotation[$index],
                'work_id' => $id // w_worksのIDを関連付け
            ]);
        }

        return response()->json(['message' => 'Work data saved successfully'], 200);

    }
}
