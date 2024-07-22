<?php

namespace App\Http\Controllers\tag;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\w_tags;


class GetWorkGenreTagController extends Controller
{
    //
    public function GetWorkGenreTagController(Request $request){
        $genre_tag = w_tags::where("item_id",11)->get();
        return json_encode($genre_tag);
    }
}
