<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;

class Location extends Model
{
 /** @use HasFactory<\Database\Factories\UserFactory> */
 use HasFactory, Notifiable;

 protected $keyType = 'string'; // Set the key type to UUID
 public $incrementing = false; // Disable auto-incrementing

 public static function booted()
 {
     static::creating(function($model)
     {
         $model->id = Str::uuid();
     });
 }

 /**
  * The attributes that are mass assignable.
  *
  * @var list<string>
  */
 protected $fillable = [
     'location_name',
     'location_address',
     'location_latitude',
     'location_longitude',
     'location_radius',
 ];
}
