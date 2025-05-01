<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\OutstationController;
use App\Http\Controllers\Auth\GoogleAuthController;
use App\Http\Controllers\Administrator\AdminController;
use App\Http\Controllers\Administrator\UserController;
use App\Http\Controllers\Administrator\EntityController;
use App\Http\Controllers\Administrator\LocationController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// })->middleware(['auth', 'verified']);

Route::get('/', function () {
return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::post('/auth/google', [GoogleAuthController::class, 'verifyToken'])->name('post.auth.google');
Route::get('/auth/google', [GoogleAuthController::class,'redirect'])->name('auth.google');
Route::get('/auth/google/callback', [GoogleAuthController::class,'callback']);

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'profile_menu'])->name('profile.menu');
    Route::get('/profile/edit', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // admin
    Route::get('/admin', [AdminController::class, 'admin_menu'])->name('admin.menu');
    Route::get('/admin/users', [UserController::class, 'users_index'])->name('admin.users.index');
    Route::post('/admin/users/{id}/verify', [UserController::class, 'users_verifyUser'])->name('admin.users.verify');

    // entity
    Route::get('/admin/entity', [EntityController::class, 'entityIndex'])->name('admin.entity.index');
    Route::post('/admin/entity/add', [EntityController::class, 'addEntity'])->name('admin.entity.add');
    Route::post('/admin/entity/edit', [EntityController::class, 'editEntity'])->name('admin.entity.edit');
    Route::post('/admin/entity/remove', [EntityController::class, 'removeEntity'])->name('admin.entity.remove');
    Route::post('/admin/entity/deactivate', [EntityController::class, 'deactivateEntity'])->name('admin.entity.deactivate');

    // location & geofencing
    Route::get('/admin/location', [LocationController::class, 'locationIndex'])->name('admin.location.index');
    Route::post('/admin/location/add', [LocationController::class, 'addLocation'])->name('admin.location.add');
    Route::post('/admin/location/remove', [LocationController::class, 'removeLocation'])->name('admin.location.remove');

    // attendance
    Route::get('/attendance', [AttendanceController::class, 'attendanceIndex'])->name('attendance.index');
    Route::post('/attendance/location-check', [AttendanceController::class, 'attendanceLocation'])->name('attendance.location.check');

    //outstation
    Route::get('/outstation', [OutstationController::class, 'outstationIndex'])->name('outstation.index');
    Route::get('/outstation/add', [OutstationController::class, 'addOutstation'])->name('outstation.add');
 
});

require __DIR__.'/auth.php';
