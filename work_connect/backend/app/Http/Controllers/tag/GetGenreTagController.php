<?php

namespace App\Http\Controllers\tag;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\w_tags;


class GetGenreTagController extends Controller
{
    //
    public function GetGenreTagController(Request $request){
        $genre_tag = w_tags::where("item_id",11)->get();
        return json_encode($genre_tag);
    }
}
