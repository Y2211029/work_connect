<?php

namespace App\Http\Controllers\tag;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\w_tags;


class GetVideoGenreTagController extends Controller
{
    public function GetVideoGenreTagController(Request $request){
        $genre_tag = w_tags::where("item_id",10)->get();
        return json_encode($genre_tag);
    }
}
