<?php

namespace App\Http\Controllers\movie;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\w_movies;

class VideoDeleteController extends Controller
{
    public function VideoDeleteController(Request $request, $id)
    {
      $query = w_movies::query();
      $query->where("movie_id", $id);
      $query->delete();

      return response()->json(['message' => 'Work data saved successfully'], 200);
    }
  }
