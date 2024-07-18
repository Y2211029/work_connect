<?php

namespace App\Http\Controllers\work;

use App\Models\w_images;
use App\Models\w_works;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class WorkPostingController extends Controller
{
    public function WorkPostingController(Request $request)
    {

        $WorkTitle = $request->input('WorkTitle');
        $WorkGenre = $request->input('WorkGenre');
        $YoutubeURL = $request->input('YoutubeURL');
        $Introduction = $request->input('Introduction');
        $Obsession = $request->input('Obsession');
        $Language = $request->input('Language');
        $Environment = $request->input('Environment');
        $images = $request->validate(['images.*' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048']); // 画像のバリデーション

        $imagePaths = [];
        if ($request->hasFile('images')) {
            \Log::info(json_encode("aaaaa"));
            foreach ($request->file('images') as $image) {
                $imagePath = $image->WorkPostingController('images', 'public');
                $imagePaths[] = $imagePath;
            }
        }

        \Log::info(json_encode($imagePaths));

        // データ保存 (例: DBに保存)
        w_works::create([
            'work_name' => $WorkTitle,
            'work_genre' => $WorkGenre,
            'youtube_url' => $YoutubeURL,
            'work_intro' => $Introduction,
            'obsession' => $Obsession,
            'programming_language' => $Language,
            'development_environment' => $Environment,
            'thumbnail' => json_encode($imagePaths)
        ]);

        \Log::info(json_encode("aaaaa"));

        return response()->json(['message' => 'Work data saved successfully'], 200);
    }
}
