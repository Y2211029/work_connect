<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        //
        Schema::create('w_wright_forms', function (Blueprint $table) {
            $table->id(); // idを主キーとして設定、自動増分
            $table->string('user_id', 255)->nullable(); //学生のid
            $table->string('news_id')->nullable(); // どのニュースの応募用フォームなのか
            $table->json('wright_form')->nullable(); // JSON形式のフォームデータ
            $table->dateTime('wrightformDateTime')->nullable(); // 最終編集/公開日時
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
        Schema::dropIfExists('w_wright_forms');

    }
};
