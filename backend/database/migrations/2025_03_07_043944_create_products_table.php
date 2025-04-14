<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up() {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description');
            $table->string('slug')->unique();
            $table->string('platform');
            $table->string('developer');
            $table->string('publisher');
            $table->string('release_date');
            $table->decimal('price', 10, 2);
            $table->string('image');
            $table->timestamps();
        });

        // Add foreign key after table creation
        Schema::table('products', function (Blueprint $table) {
            $table->foreignId('category_id')->after('id')->constrained()->onDelete('cascade');
        });
    }

    public function down() {
        Schema::dropIfExists('products');
    }
};
