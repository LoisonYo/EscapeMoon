<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SavedItem extends Model
{
    use HasFactory;

    protected $table = 'saved_items';
    public $timestamps = false;

    protected $fillable = [
        'saved_scenario_id',
        'item_id',
        'picked',
        'inventory',
    ];

    public function item()
    {
        return $this->belongsTo('App\Models\Item');
    }

    public function savedScenario()
    {
        return $this->belongsTo('App\Models\SavedScenario');
    }
}
