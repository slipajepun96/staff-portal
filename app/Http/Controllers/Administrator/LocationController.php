<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Location;

class LocationController extends Controller
{
    public function locationIndex(): Response
    {
        $geofences = Location::all();
        return Inertia::render('Admin/Location&Geofencing/LocationIndex', [
            ['geofences' => $geofences]
        ]);
    }
}
