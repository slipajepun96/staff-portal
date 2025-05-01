<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Location;

class LocationController extends Controller
{
    public function locationIndex(): Response
    {
        // $geofences = Location::where('id','=','45751726-6815-481b-ad77-db6415679fc4')->get();
        $geofences = Location::orderBy('created_at')->get();

        // dd($geofences);
        return Inertia::render('Admin/Location&Geofencing/LocationIndex', [
            'geofences' => $geofences
        ]);
    }

    public function addLocation(Request $request): RedirectResponse
    {
        $validatedData = $request->validate([
            'location_name' => 'required|string|max:255',
            'location_address' => 'required|string|max:255',
            'location_latitude' => 'required|numeric|between:-90,90',
            'location_longitude' => 'required|numeric|between:-180,180',
            'location_radius' => 'required|numeric|min:100',
        ]);

        try {
            $location = new Location();
            $location->location_name = $validatedData['location_name'];
            $location->location_address = $validatedData['location_address'];
            $location->location_latitude = $validatedData['location_latitude'];
            $location->location_longitude = $validatedData['location_longitude'];
            $location->location_radius = $validatedData['location_radius'];
            $location->save();

            return redirect()->route('admin.location.index')->with('success', 'Lokasi berjaya ditambah');
        } catch (\Exception $e) {
            // Handle any unexpected errors
            return redirect()->back()->withErrors(['error' => 'An error occurred while adding the location. Please try again.']);
        }

    }

    public function removeLocation(Request $request): RedirectResponse
    {
        $id = $request->id;
        $location = Location::findOrFail($id);
        $location->delete();

        return redirect()->route('admin.location.index')->with('success', 'Lokasi berjaya dipadam');
    }

    
}
