<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class AttendanceController extends Controller
{
    public function attendance_menu(Request $request): Response
    {
        return Inertia::render('Attendance/AttendanceMenu', [
            'status' => session('status'),
        ]);
    }

}
