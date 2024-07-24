<?php

namespace App\Http\Controllers\tag;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\w_tags;

class GetAcquisitionQualificationTagController extends Controller
{
    public function GetAcquisitionQualificationTagController(Request $request){
        $language_tag = w_tags::where("item_id", 7)->get();
        return json_encode($language_tag);
    }
}
