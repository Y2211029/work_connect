<?php

namespace App\Http\Controllers\work;

use App\Models\w_images;
use App\Models\w_works;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class WorkPostingController extends Controller
{
    public function store(Request $request)
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

        $pathArray = [];
        if (is_array($imagesArray) && count($imagesArray) > 0) {
            foreach ($imagesArray as $value) {
                // \Log::info('$value: ', $value);
                $pathArray[] = explode('/', $value->store('public/images/work'))[3];
            }
        } else {
            // エラーハンドリング：nullが渡された場合
            return response()->json(['error' => 'No images provided.'], 400);
        }

        \Log::info('$pathArray: ', $pathArray);


        // データ保存 (例: DBに保存)
        w_works::create([
            'work_name' => $WorkTitle,
            'work_genre' => $WorkGenre,
            'youtube_url' => $YoutubeURL,
            'work_intro' => $Introduction,
            'obsession' => $Obsession,
            'programming_language' => $Language,
            'development_environment' => $Environment,
            'thumbnail' => implode(',', $pathArray)
        ]);
        foreach ($pathArray as $data) {
            w_images::create([
                'image' => $data, // 'column_name'は実際のカラム名に変更
            ]);
        }


        return response()->json(['message' => 'Work data saved successfully'], 200);
    }
}
