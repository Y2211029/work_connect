<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WPreCompany extends Model
{
    use HasFactory;

    // テーブル名を指定（省略可能、Laravelはモデル名を複数形にして自動推測する）
    protected $table = 'w_pre_companies';

    // マスアサインメント可能な属性
    protected $fillable = [
        'urltoken',
        'company_name',
        'mail',
        'password',
        'date',
        'flag',
    ];

    // タイムスタンプのカラムが存在しない場合は、$timestampsをfalseに設定
    // public $timestamps = false;
}
