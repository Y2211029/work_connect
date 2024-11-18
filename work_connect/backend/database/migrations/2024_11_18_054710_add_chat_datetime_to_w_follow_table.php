<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('w_follow', function (Blueprint $table) {
            $table->dateTime('chat_datetime')->nullable()->after('follow_datetime');
            // "existing_column_name" を `chat_datetime` を追加したい列の直前の列名に置き換えてください
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('w_follow', function (Blueprint $table) {
            $table->dropColumn('chat_datetime');
        });
    }
};
