<?php

namespace App\Http\Controllers\tag;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\w_tags;

class GetDepartmentNameTagController extends Controller
{
    public function GetDepartmentNameTagController(Request $request)
    {
        $tag = \DB::table('w_tags')
            ->where('item_id', 17)
            ->whereExists(function ($query) {
                $query->select(\DB::raw(1))
                    ->from('w_users')
                    ->whereRaw('w_users.department_name REGEXP CONCAT("(^|,)", w_tags.name, "(,|$)")');
            })
            ->get();

        \Log::info('GetDepartmentNameTagController.php:$tag:');
        \Log::info($tag);
        return json_encode($tag);
    }
}