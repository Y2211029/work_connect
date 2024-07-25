<?php

namespace App\Http\Controllers\tag;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\w_tags;


class GetLanguageTagController extends Controller
{
    public function GetLanguageTagController(Request $request){
        $tag = w_tags::where("item_id",12)->get();
        return json_encode($tag);
    }
}
