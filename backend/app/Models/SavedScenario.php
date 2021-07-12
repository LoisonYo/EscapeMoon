<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SavedScenario extends Model
{
    use HasFactory;

    protected $table = 'saved_scenarios';
    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'scenario_id',
        'last_saved_scene_id',
        'creation',
        'last_save',
        'time',
    ];

    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }

    public function scenario()
    {
        return $this->belongsTo('App\Models\Scenario');
    }
}
