<?php

namespace App\Http\Controllers\tag;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\w_tags;

class GetSoftwareTagController extends Controller
{
    public function GetSoftwareTagController(Request $request){
        $language_tag = w_tags::where("item_id", 5)->get();
        return json_encode($language_tag);
    }
}
