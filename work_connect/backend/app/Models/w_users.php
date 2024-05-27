<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class w_users extends Model
{
    protected $table = 'w_users'; // テーブル名を指定
    
    protected $primaryKey = 'user_id'; // プライマリキーを指定（デフォルトは'id'カラム）
    
    public $timestamps = false; // タイムスタンプを使用しない場合はfalseにする
    
    // 可変項目（Mass Assignment）を指定する場合
    protected $fillable = [
        'user_name',
        'password',
        // 他のカラム
    ];
}
