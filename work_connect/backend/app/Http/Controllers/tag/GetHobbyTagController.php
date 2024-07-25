<?php

namespace App\Http\Controllers\tag;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\w_tags;

class GetHobbyTagController extends Controller
{
    public function GetHobbyTagController(Request $request){
        $tag = w_tags::where("item_id", 8)->get();
        return json_encode($tag);
    }
}
