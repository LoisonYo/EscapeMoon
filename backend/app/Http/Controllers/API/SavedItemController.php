<?php

namespace App\Http\Controllers\API;

use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Models\SavedScenario;
use App\Models\SavedItem;

class SavedItemController extends Controller
{
    public function inventory(Request $request)
    {
        $request->validate([
            'saved_scenario_id' => 'required|integer',
        ]);

        $inventory = SavedItem::where([
            ['saved_scenario_id', $request->saved_scenario_id],
            ['inventory', true],
        ])->get();

        return response()->json($inventory, 200);
    }
}
