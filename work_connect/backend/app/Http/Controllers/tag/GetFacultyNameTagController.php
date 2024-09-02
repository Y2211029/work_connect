<?php

namespace App\Http\Controllers\tag;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\w_tags;

class GetFacultyNameTagController extends Controller
{
    public function GetFacultyNameTagController(Request $request)
    {
        $tag = \DB::table('w_tags')
            ->where('item_id', 18)
            ->whereExists(function ($query) {
                $query->select(\DB::raw(1))
                    ->from('w_users')
                    ->whereRaw('w_users.faculty_name REGEXP CONCAT("(^|,)", w_tags.name, "(,|$)")');
            })
            ->get();

        \Log::info('GetFacultyNameTagController.php:$tag:');
        \Log::info($tag);
        return json_encode($tag);
    }
}