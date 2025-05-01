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
        Schema::create('attendances', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->timestamps();
            $table->string('staff_uuid');
            $table->string('attendance_date');
            $table->string('attendance_type')->nullable();
            $table->string('attendance_status')->nullable(); // present, absent, leave
            $table->string('attendance_clock_in_actual_time')->nullable();
            $table->string('attendance_clock_in_location')->nullable();
            $table->string('attendance_clock_in_remarks')->nullable();
            $table->string('attendance_clock_in_supposed_time')->nullable();
            $table->string('attendance_rest_out_actual_time')->nullable();
            $table->string('attendance_rest_out_location')->nullable();
            $table->string('attendance_rest_out_remarks')->nullable();
            $table->string('attendance_rest_out_supposed_time')->nullable();
            $table->string('attendance_rest_in_actual_time')->nullable();
            $table->string('attendance_rest_in_location')->nullable();
            $table->string('attendance_rest_in_remarks')->nullable();
            $table->string('attendance_rest_in_supposed_time')->nullable();
            $table->string('attendance_clock_out_actual_time')->nullable();
            $table->string('attendance_clock_out_location')->nullable();
            $table->string('attendance_clock_out_remarks')->nullable();
            $table->string('attendance_clock_out_supposed_time')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attendances');
    }
};
