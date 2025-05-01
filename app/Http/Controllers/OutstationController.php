<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OutstationController extends Controller
{
    public function outstationIndex(Request $request): Response
    {
        return Inertia::render('Outstation/OutstationIndex');
    }

    public function addOutstation(): Response 
    {
        return Inertia::render('Outstation/AddOutstationLog');
    }
}
