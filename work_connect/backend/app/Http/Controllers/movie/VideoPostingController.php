<?php

namespace App\Http\Controllers\movie;

use App\Models\w_movies;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class VideoPostingController extends Controller
{
    public function VideoPostingController(Request $request)
    {
        $VideoTitle = $request->input('WorkTitle');
        $VideoGenre = $request->input('VideoGenre');
        $YoutubeURL = $request->input('YoutubeURL');
        $Introduction = $request->input('Introduction');

        w_movies::create([
            'title' => $VideoTitle,
            'genre' => $VideoGenre,
            'youtube_url' => $YoutubeURL,
            'intro' => $Introduction,
        ]);


        return response()->json(['message' => 'Work data saved successfully'], 200);
    }
}
