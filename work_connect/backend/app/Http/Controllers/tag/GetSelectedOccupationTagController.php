<?php

namespace App\Http\Controllers\tag;

use App\Http\Controllers\Controller;
use App\Models\w_tags;
use Illuminate\Http\Request;

class GetSelectedOccupationTagController extends Controller
{
    public function GetSelectedOccupationTagController(Request $request){
        $tag = w_tags::where("item_id", 14)->get();
        return json_encode($tag);
    }
}
