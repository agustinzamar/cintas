<?php

use App\Enums\RoleEnum;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('roles', function (Blueprint $table) {
            $table->string('default_home_page')->nullable();
        });

        DB::table('roles')->whereIn('id', [RoleEnum::SUPERADMIN, RoleEnum::ADMINISTRATOR])->update(['default_home_page' => '']);
        DB::table('roles')->whereIn('id', [RoleEnum::MANAGER, RoleEnum::WHAREHOUSE_MANAGER])->update(['default_home_page' => '/orders']);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('roles', function (Blueprint $table) {
            $table->dropColumn('default_home_page');
        });
    }
};
