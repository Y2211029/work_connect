<?php

namespace App\Http\Controllers\movie;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\w_movies;

class VideoEditController extends Controller
{
  public function VideoEditController(Request $request, $id)
  {
    $userId = $request->input('creatorId');
    \Log::info($userId);

    $VideoId = $request->workId;
    $VideoTitle = $request->input('VideoTitle');
    $VideoGenre = $request->input('VideoGenre');
    $YoutubeURL = $request->input('YoutubeURL');
    $Introduction = $request->input('VideoIntroduction');
    \Log::info($VideoTitle);
    \Log::info($id);

    $query = w_movies::query();

    $query->where("movie_id", $id);
    $query->update([
      'title' => $VideoTitle,
      'genre' => $VideoGenre,
      'youtube_url' => $YoutubeURL,
      'intro' => $Introduction,
    ]);

    return response()->json(['message' => 'Work data saved successfully'], 200);
  }
}
