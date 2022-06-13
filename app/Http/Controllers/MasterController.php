<?php

namespace App\Http\Controllers;

use App\Models\Asset;
use Illuminate\Http\Request;

class MasterController extends Controller
{
    public function get_pengajuan()
    {
        $asset = Asset::where('status', 'pengajuan')->get();
        $wl = [];

        foreach ($asset as $a) {
            if (count($wl) == 0) {
                $wl[] = [
                    "periode" => $a->periode,
                    "semester" => $a->semester
                ];
            } else {
                $check = false;
                foreach ($wl as $w) {
                    if ($w["periode"] == $a->periode && $w["semester"] == $a->semester) {
                        $check = true;
                        break;
                    }
                }
                if (!$check) {
                    $wl[] = [
                        "periode" => $a->periode,
                        "semester" => $a->semester
                    ];
                }
            }
        }

        $response = [
            "response" => "success",
            "pengajuan" => $wl
        ];
        return response()->json($response);
    }

    public function get_pengajuan_asset(Request $request)
    {
        $asset = Asset::where('periode', $request->periode)->where('semester', $request->semester)->get();
        return response()->json([
            "response" => "success",
            "asset" => $asset
        ]);
    }

    public function terima_pengajuan(Request $request)
    {
        Asset::where('periode', $request->periode)->where('semester', $request->semester)->update([
            "status" => "diterima"
        ]);
        return response()->json([
            "response" => "success",
            "message" => "Pengajuan pengadaan aset tahun $request->periode semester $request->semester diterima"
        ]);
    }

    public function tolak_pengajuan(Request $request)
    {
        Asset::where('periode', $request->periode)->where('semester', $request->semester)->update([
            "status" => "ditolak"
        ]);
        return response()->json([
            "response" => "success",
            "message" => "Pengajuan pengadaan aset tahun $request->periode semester $request->semester ditolak"
        ]);
    }
}
