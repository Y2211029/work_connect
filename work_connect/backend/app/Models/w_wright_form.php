<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class w_wright_form extends Model
{
    use HasFactory;

    protected $table = 'w_wright_forms';
    protected $keyType = 'int';
    protected $fillable = [
        'id',
        'user_id',
        'news_id',
        'wright_form',
        'wrightformDateTime',
    ];

}
