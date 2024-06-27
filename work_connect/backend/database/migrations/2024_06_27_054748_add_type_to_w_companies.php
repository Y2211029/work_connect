<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up() {
        Schema::table('w_companies', function (Blueprint $table) {
            $table->text('company_nameCana')->nullable()->after('company_name'); 
            $table->text('selectedOccupation')->nullable()->after('company_nameCana'); 
            $table->text('Prefecture')->nullable()->after('selectedOccupation'); 
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down() {
        Schema::table('w_companies', function (Blueprint $table) { 
            $table->dropColumn('company_nameCana'); 
            $table->dropColumn('selectedOccupation'); 
            $table->dropColumn('Prefecture'); 
        });
    }
        
};
