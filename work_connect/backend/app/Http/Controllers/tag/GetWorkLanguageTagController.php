<?php

namespace App\Http\Controllers\tag;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\w_tags;


class GetWorkLanguageTagController extends Controller
{
    //
    public function GetWorkLanguageTagController(Request $request){
        $language_tag = w_tags::where("item_id",12)->get();
        return json_encode($language_tag);
    }
}
