<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Location;

class AttendanceController extends Controller
{
    public function attendanceIndex(Request $request): Response
    {
        return Inertia::render('Attendance/AttendanceIndex', [
            'status' => session('status'),
        ]);
    }

    public function attendanceLocation(Request $request)  
    {
        $request->validate([
            'latitude' => 'required',
            'longitude' => 'required',
        ]);

        $userLatitude = $request->latitude;
        $userLongitude = $request->longitude;

        $locations = Location::all();

        foreach ($locations as $location) {
            $distance = $this->haversineGreatCircleDistance(
                $userLatitude, $userLongitude,
                $location->location_latitude, $location->location_longitude
            );
            // dd($location->location_radius);
            if($distance <= $location->location_radius) {
                // return response()->json([
                //     'status' => 'inside',
                //     'location' => $location,
                // ]);
                return redirect()->back()->with('flash.response', [
                    'status' => 'inside',
                    'location' => $location,
                ]);
            }
        }

        // return response()->json([
        //     'status' => 'outside',
        // ]);
        return back()->with('flash', [
            'response' => [
                'status' => 'outside',
            ],
        ]);
    }

    private function haversineGreatCircleDistance($lat1, $lon1, $lat2, $lon2, $earthRadius = 6371000)
    {
        // Convert from degrees to radians
        $latFrom = deg2rad($lat1);
        $lonFrom = deg2rad($lon1);
        $latTo = deg2rad($lat2);
        $lonTo = deg2rad($lon2);

        $latDelta = $latTo - $latFrom;
        $lonDelta = $lonTo - $lonFrom;

        $angle = 2 * asin(sqrt(pow(sin($latDelta / 2), 2) +
            cos($latFrom) * cos($latTo) * pow(sin($lonDelta / 2), 2)));
        
        return $angle * $earthRadius; // meters
    }
 
}
