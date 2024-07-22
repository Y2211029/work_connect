<?php

namespace App\Http\Controllers\tag;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\w_tags;


class GetWorkEnvironmentTagController extends Controller
{
    //
    public function GetWorkEnvironmentTagController(Request $request){
        $environment_tag = w_tags::where("item_id",13)->get();
        return json_encode($environment_tag);
    }
}
