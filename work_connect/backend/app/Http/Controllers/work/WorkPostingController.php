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
        \Log::info(json_decode(json_encode($request->input('images'))));
        if ($request->hasFile('images')) {
            \Log::info(json_encode("aaaaaaaaaaaaaaaaa"));
            // foreach ($request->file('images') as $image) {
            //     \Log::info(json_encode("fssdfsd"));
            //     $imagePath = $image->store('public');
            // }
            $imagePath = $request->files("images")->store('public');
        }

        // データ保存 (例: DBに保存)
        w_works::create([
            'work_name' => $WorkTitle,
            'work_genre' => $WorkGenre,
            'youtube_url' => $YoutubeURL,
            'work_intro' => $Introduction,
            'obsession' => $Obsession,
            'programming_language' => $Language,
            'development_environment' => $Environment,
            'thumbnail' => $images
        ]);


        return response()->json(['message' => 'Work data saved successfully'], 200);
    }
}
