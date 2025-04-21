<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Http;

class GoogleAuthController extends Controller
{
    public function redirect()
    {
        return Socialite::driver('google')->redirect();
    }

    //handle google callback
    public function callback()
    {
        try{
            $googleUser = Socialite::driver('google')->user();

            $user = User::updateOrCreate(
                ['email' => $googleUser->getEmail()],
                [
                    'name' => $googleUser->getName(),
                    'google_id' => $googleUser->getid(),
                    'password' => bcrypt(uniqid()),
                ]
                );

                Auth::login($user);
                return redirect('/');
        } catch(\Exception $e) {
            return redirect('/login');
        }
    }

    public function verifyToken(Request $request)
    {
        $googleToken = $request->credential;

        dd($request);

        // Verify token with Google
        $googleResponse = Http::get("https://oauth2.googleapis.com/tokeninfo?id_token={$googleToken}");

        if ($googleResponse->failed()) {
            return response()->json(['error' => 'Invalid Google token'], 401);
        }

        $googleUser = $googleResponse->json();

        // Find or create user
        $user = User::updateOrCreate(
            ['email' => $googleUser['email']],
            [
                'name' => $googleUser['name'],
                'google_id' => $googleUser['sub'],
                'password' => bcrypt(uniqid()), // Random password
            ]
        );

        Auth::login($user);

        return redirect('/dashboard');
    }
}
