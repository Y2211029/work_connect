<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('w_companies', function (Blueprint $table) {
            $table->string('id', 16)->primary(); // idを主キーとして設定
            $table->text('company_name')->nullable(); // 会社名
            $table->text('company_namecana')->nullable(); // 会社名(カタカナ)
            $table->text('selected_occupation')->nullable(); // 職種
            $table->text('prefecture')->nullable(); // 会社の場所(県)
            $table->text('mail')->nullable(); // メール
            $table->text('user_name	')->nullable(); // 企業採用・広報担当者
            $table->text('password')->nullable(); // パスワード
            $table->text('thumbnail_id')->nullable(); // サムネイルID
            $table->text('icon_id')->nullable(); // アイコンID
            $table->text('intro')->nullable(); // 紹介文
            $table->text('office')->nullable(); // オフィス
            $table->text('industry')->nullable(); // 業界
            $table->text('others')->nullable(); // その他
            $table->text('address')->nullable(); // 住所
            $table->text('hp_url')->nullable(); // ホームページURL
            $table->text('map_url')->nullable(); // 地図URL
            $table->text('video_url')->nullable(); // ビデオURL
            $table->text('background_color')->nullable(); // 背景色
            $table->dateTime('registered_datetime')->nullable(); // 登録日時
            $table->timestamps(); // created_atとupdated_atのカラムを自動作成
        });

        \DB::table('w_companies')->insert(
            [
                'id' => 'C_000000000001',
                'company_name' => '日本情報産業株式会社',
                'company_namecana' => 'ニホンサンギョウカブシキガイシャ',
                'selected_occupation' => 'IT',
                'prefecture' => '北海道,群馬県,東京都,静岡県,愛知県,大阪府',
                'mail' => '2210016@i-seifu.jp',
                'user_name' => '日本情報産業株式会社 田中 太郎',
                'password' => 'Nii@2023',
                'thumbnail_id' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCUoiBXEyeblLOzB1P569MbOxn64mZZInNVw&s',
                'icon_id' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCUoiBXEyeblLOzB1P569MbOxn64mZZInNVw&s',
                'intro' => '創業から50年以上が経過しました。その間、NIIはいわゆる独立系の立場を貫き、特定企業に依存しないITスペシャリスト集団として事業を展開してきました。自由だからこそ問われるのは、企業の課題解決に資する卓越した技術力と提案力です。目的意識を共有するパートナーとして、業種を問わず多くのお客様から信頼を寄せていただきながらも、NIIはなお自己研鑽を怠らず、貪欲に進化していきます。そして、目まぐるしい情報社会だからこそ、お客様の先にいる生活者の方々をも丁寧に想い続けます。企業のみならず、社会をも想う、それがNIIのITです。',
                'office' => '北海道,群馬県,東京都,静岡県,愛知県,大阪府',
                'industry' => 'Sler',
                'others' => 'プライバシーマーク使用許諾事業者 認定No.第11820163号
                            ISO / IEC 27001認証取得（JQA-IM0379）
                            （本社コンピュータセンター、本社・各支社データセンター）
                            労働者派遣事業者（許可番号 派13-305038）
                            職業紹介事業者（許可番号 13-ユ-306272）',
                'address' => '〒150-0002 東京都渋谷区渋谷3-1-4',
                'map_url' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.774611145553!2d139.70518107623047!3d35.6579243312532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188b5c1eb5e359%3A0x8acbb27579f65f9c!2z5pel5pys5oOF5aCx55Sj5qWt44ixKE5JSSk!5e0!3m2!1sja!2sjp!4v1721182755137!5m2!1sja!2sjp',
                'hp_url' => 'https://www.nii.co.jp/',
                'video_url' => 'https://www.youtube.com/embed/B4HiIJhoofU?si=P8YsGmpPCVLXKoSC ',
            ]
        );
    }



    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('w_companies');
    }
};
