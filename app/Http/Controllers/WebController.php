<?php

namespace App\Http\Controllers;

use App\Models\Asset;
use App\Models\Karyawan;
use App\Models\Kriteria;
use App\Models\SubKriteria;
use App\Models\NKriteria;
use App\Models\NPenilaian;
use App\Models\Penilaian;
use App\Models\Vendor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class WebController extends Controller
{
    function random($type, $length)
    {
        $result = "";
        if ($type == 'char') {
            $char = 'ABCDEFGHJKLMNPRTUVWXYZ';
            $max        = strlen($char) - 1;
            for ($i = 0; $i < $length; $i++) {
                $rand = mt_rand(0, $max);
                $result .= $char[$rand];
            }
            return $result;
        } elseif ($type == 'num') {
            $char = '123456789';
            $max        = strlen($char) - 1;
            for ($i = 0; $i < $length; $i++) {
                $rand = mt_rand(0, $max);
                $result .= $char[$rand];
            }
            return $result;
        } elseif ($type == 'mix') {
            $char = 'ABCDEFGHJKLMNPRTUVWXYZ123456789';
            $max = strlen($char) - 1;
            for ($i = 0; $i < $length; $i++) {
                $rand = mt_rand(0, $max);
                $result .= $char[$rand];
            }
            return $result;
        }
    }

    public function login_attempt(Request $request)
    {
        if (Auth::attempt(['username' => $request->username, 'password' => $request->password])) {
            return redirect('/dashboard');
        } else {
            Session::flash('failed');
            return redirect()->back()->withInput($request->all());
        }
    }

    public function logout()
    {
        Auth::logout();
        return redirect('/');
    }

    public function dashboard()
    {
        $karyawan = Karyawan::all();
        $karyawan = count($karyawan);

        $kriteria = Kriteria::all();
        $kriteria = count($kriteria);

        return view('dashboard', compact('karyawan', 'kriteria'));
    }

    public function pengadaan_asset()
    {
        return view('pengadaan-asset');
    }

    public function pengadaan_asset_get(Request $request)
    {
        $asset = Asset::where('periode', $request->periode)->where('semester', $request->semester)->get();
        $status = null;
        foreach ($asset as $a) {
            $status = $a->status;
        }

        $vendor = Vendor::where('periode', $request->periode)->where('semester', $request->semester)->get();

        $response = [
            "response" => "success",
            "asset" => $asset,
            "status" => $status,
            "vendor" => $vendor
        ];

        return response()->json($response);
    }

    public function pengadaan_asset_input(Request $request)
    {
        Asset::create([
            "periode" => $request->periode,
            "semester" => $request->semester,
            "barang" => $request->barang,
            "jumlah" => $request->jumlah,
            "status" => "pending"
        ]);

        return response()->json([
            "response" => "success",
            "message" => "Data aset berhasil ditambahkan"
        ]);
    }

    public function pengadaan_asset_delete($id)
    {
        Asset::find($id)->delete();
        return response()->json([
            "response" => "success",
            "message" => "Data aset berhasil dihapus"
        ]);
    }

    public function pengadaan_asset_vendor_input(Request $request)
    {
        $penilaian = Penilaian::where('periode', $request->periode)->where('semester', $request->semester)->get();
        $kriteria = Kriteria::where('periode', $request->periode)->where('semester', $request->semester)->get();

        if ($kriteria->count() == 0) {
            return response()->json([
                "response" => "failed",
                "message" => "Kriteria belum dibuat"
            ]);
        }

        $new_vendor = Vendor::create([
            "periode" => $request->periode,
            "semester" => $request->semester,
            "nama" => $request->name,
        ]);

        $periodePenilaian = [];
        foreach ($penilaian as $p) {
            $cek = array_search($p->periode, $periodePenilaian);
            if ($cek === false) {
                $periodePenilaian[] = $p->periode;
            }
        }

        foreach ($kriteria as $k) {
            Penilaian::create([
                'periode' => $request->periode,
                'semester' => $request->semester,
                'id_vendor' => $new_vendor->id,
                'id_kriteria' => $k->id,
                'nilai' => 0
            ]);
        }

        $npenilaian = NPenilaian::where('periode', $request->periode)->where('semester', $request->semester)->get();
        foreach ($npenilaian as $np) {
            NPenilaian::where('id', $np->id)->delete();
        }

        $penilaian = Penilaian::where('periode', $request->periode)->where('semester', $request->semester)->get();
        foreach ($penilaian as $p) {
            $maxVal = Penilaian::where('periode', $request->periode)->where('semester', $request->semester)->where('id_kriteria', $p->id_kriteria)->max('nilai');
            $nilai = 0;
            if ($maxVal > 0) {
                $nilai = $p->nilai / $maxVal;
                $nilai = number_format((float)$nilai, 2, '.', '');
            }

            $np_id = NPenilaian::max('id');
            $np_id = $np_id + 1;
            NPenilaian::create([
                'id' => $np_id,
                'periode' => $p->periode,
                'semester' => $p->semester,
                'id_vendor' => $p->id_vendor,
                'id_kriteria' => $p->id_kriteria,
                'nilai' => $nilai
            ]);
        }

        return response()->json([
            "response" => "success",
            "message" => "Data vendor berhasil di input"
        ]);
    }

    public function pengadaan_asset_vendor_delete($id)
    {
        $vendor = Vendor::find($id);
        Penilaian::where('id_vendor', $id)->delete();

        $penilaian = Penilaian::where('periode', $vendor->periode)->where('semester', $vendor->semester)->get();

        $npenilaian = NPenilaian::where('periode', $vendor->periode)->where('semester', $vendor->semester)->get();
        foreach ($npenilaian as $np) {
            NPenilaian::where('id', $np->id)->delete();
        }

        $penilaian = Penilaian::where('periode', $vendor->periode)->where('semester', $vendor->semester)->get();
        foreach ($penilaian as $p) {
            $maxVal = Penilaian::where('periode', $vendor->periode)->where('semester', $vendor->semester)->where('id_kriteria', $p->id_kriteria)->max('nilai');
            $nilai = 0;
            if ($maxVal > 0) {
                $nilai = $p->nilai / $maxVal;
                $nilai = number_format((float)$nilai, 2, '.', '');
            }

            $np_id = NPenilaian::max('id');
            $np_id = $np_id + 1;
            NPenilaian::create([
                'id' => $np_id,
                'periode' => $p->periode,
                'semester' => $p->semester,
                'id_vendor' => $p->id_vendor,
                'id_kriteria' => $p->id_kriteria,
                'nilai' => $nilai
            ]);
        }

        $vendor->delete();

        return response()->json([
            "response" => "success",
            "message" => "Data aset berhasil dihapus"
        ]);
    }

    public function pengadaan_asset_pengajuan(Request $request)
    {
        Asset::where('periode', $request->periode)->where('semester', $request->semester)->update([
            "status" => "pengajuan"
        ]);

        return response()->json([
            "response" => "success",
            "message" => "Pengadaan aset berhasil di ajukan"
        ]);
    }

    // Ambil data kriteria
    public function get_kriteria($periode, $semester)
    {
        $kriteria = Kriteria::where('periode', $periode)->where('semester', $semester)->get();
        $response = [
            "data" => $kriteria,
            "response" => "success"
        ];

        return response()->json($response);
    }

    // Input kriteria
    public function add_kriteria(Request $request)
    {
        $idKriteriaMax = Kriteria::all();
        $idKriteriaMax = count($idKriteriaMax) + 1;
        $idKriteria = $idKriteriaMax . $this->random('mix', 4);
        while (true) {
            $cek = Kriteria::where('id', $idKriteria)->first();
            if ($cek) {
                $idKriteriaMax = Kriteria::all();
                $idKriteriaMax = count($idKriteriaMax) + 1;
                $idKriteria = $idKriteriaMax . $this->random('mix', 4);
            } else {
                break;
            }
        }

        Kriteria::create([
            'id' => $idKriteria,
            'periode' => $request->periode,
            'semester' => $request->semester,
            'nama' => $request->nama,
            'bobot' => $request->bobot
        ]);

        $penilaian = Penilaian::where('periode', $request->periode)->where('semester', $request->semester)->get();
        $karyawan = Vendor::where('periode', $request->periode)->where('semester', $request->semester)->get();

        // $periodePenilaian = [];
        // foreach ($penilaian as $p) {
        //     $cek = array_search($p->periode, $periodePenilaian);
        //     if ($cek === false) {
        //         $periodePenilaian[] = $p->periode;
        //     }
        // }

        foreach ($penilaian as $p) {
            foreach ($karyawan as $k) {
                Penilaian::create([
                    'periode' => $p->periode,
                    'semester' => $p->semester,
                    'id_vendor' => $k->id,
                    'id_kriteria' => $idKriteria,
                    'nilai' => 0
                ]);
            }
        }

        $nkriteria = NKriteria::where('periode', $request->periode)->where('semester', $request->semester)->get();
        foreach ($nkriteria as $nk) {
            NKriteria::where('id', $nk->id)->delete();
        }

        $maxBobot = Kriteria::where('periode', $request->periode)->where('semester', $request->semester)->sum('bobot');
        $kriteria = Kriteria::where('periode', $request->periode)->where('semester', $request->semester)->get();
        foreach ($kriteria as $k) {
            $bobot = $k->bobot / $maxBobot;
            $bobot = number_format((float)$bobot, 2, '.', '');

            NKriteria::create([
                'id' => $k->id,
                'periode' => $request->periode,
                'semester' => $request->semester,
                'nama' => $k->nama,
                'bobot' => $bobot
            ]);
        }

        return response()->json(["response" => "success"]);
    }

    // Update kriteria
    public function update_kriteria(Request $request)
    {
        $kriteria = Kriteria::find($request->id);
        $kriteria->update([
            "nama" => $request->nama,
            "bobot" => $request->bobot
        ]);

        $nkriteria = NKriteria::where('periode', $kriteria->periode)->where('semester', $kriteria->semester)->get();
        foreach ($nkriteria as $nk) {
            NKriteria::where('id', $nk->id)->delete();
        }

        $maxBobot = Kriteria::where('periode', $kriteria->periode)->where('semester', $kriteria->semester)->sum('bobot');
        $d_kriteria = Kriteria::where('periode', $kriteria->periode)->where('semester', $kriteria->semester)->get();
        foreach ($d_kriteria as $k) {
            $bobot = $k->bobot / $maxBobot;
            $bobot = number_format((float)$bobot, 2, '.', '');

            NKriteria::create([
                'id' => $k->id,
                'periode' => $k->periode,
                'semester' => $k->semester,
                'nama' => $k->nama,
                'bobot' => $bobot
            ]);
        }

        return response()->json(["response" => "success"]);
    }

    // Hapus kriteria
    public function delete_kriteria(Request $request)
    {
        $kriteria = Kriteria::find($request->id);
        Kriteria::where('id', $request->id)->delete();
        SubKriteria::where('id_kriteria', $request->id)->delete();
        Penilaian::where('id_kriteria', $request->id)->delete();

        $nkriteria = NKriteria::where('periode', $kriteria->periode)->where('semester', $kriteria->semester)->get();
        foreach ($nkriteria as $nk) {
            NKriteria::where('id', $nk->id)->delete();
        }

        $maxBobot = Kriteria::where('periode', $kriteria->periode)->where('semester', $kriteria->semester)->sum('bobot');
        $d_kriteria = Kriteria::where('periode', $kriteria->periode)->where('semester', $kriteria->semester)->get();
        foreach ($d_kriteria as $k) {
            $bobot = $k->bobot / $maxBobot;
            $bobot = number_format((float)$bobot, 2, '.', '');

            NKriteria::create([
                'id' => $k->id,
                'periode' => $k->periode,
                'semester' => $k->semester,
                'nama' => $k->nama,
                'bobot' => $bobot
            ]);
        }

        return response()->json(["response" => "success"]);
    }

    // Ambil data kriteria normalisasi
    public function get_kriteria_normalisasi($periode, $semester)
    {
        $nkriteria = NKriteria::where('periode', $periode)->where('semester', $semester)->get();
        return response()->json($nkriteria);
    }

    public function kriteria_get_sub(Request $request)
    {
        $subkriteria = Kriteria::find($request->id_kriteria)->subKriteria;
        return response()->json($subkriteria);
    }

    // Ambil sub kriteria
    public function get_sub_kriteria()
    {
        $SubKriteria = SubKriteria::all();
        $response = [
            "data" => $SubKriteria,
            "response" => "success"
        ];

        return response()->json($response);
    }

    // Tambah sub kriteria
    public function add_sub_kriteria(Request $request)
    {
        $idKriteria = $this->random('mix', 5);
        while (true) {
            $cek = SubKriteria::where('id', $idKriteria)->first();
            if ($cek) {
                $idKriteria = $this->random('mix', 5);
            } else {
                break;
            }
        }

        SubKriteria::create([
            'id' => $idKriteria,
            'id_kriteria' => $request->id_kriteria,
            'nama' => $request->nama,
            'nilai' => $request->nilai
        ]);

        return response()->json(["response" => "success"]);
    }

    // Update sub kriteria
    public function update_sub_kriteria(Request $request)
    {
        SubKriteria::where('id', $request->id)->update([
            "nama" => $request->nama,
            "nilai" => $request->nilai
        ]);
        return response()->json(["response" => "success"]);
    }

    // Hapus sub kriteria
    public function delete_sub_kriteria(Request $request)
    {
        SubKriteria::where('id', $request->id)->delete();

        return response()->json(["response" => "success"]);
    }

    // Ambil data penilaian
    public function get_penilaian_karyawan(Request $request)
    {
        $penilaian = Penilaian::where('periode', $request->periode)->where('semester', $request->semester)->get();
        if (count($penilaian) == 0) {
            return response()->json(["response" => false, "periode" => $request->periode, "semester" => $request->semester]);
        } else {
            $karyawan = Vendor::where('periode', $request->periode)->where('semester', $request->semester)->get();
            $kriteria = Kriteria::where('periode', $request->periode)->where('semester', $request->semester)->get();
            $data = [];

            foreach ($karyawan as $karyawanKey => $karyawanVal) {
                $data[$karyawanKey]["id_vendor"] = $karyawanVal->id;
                $data[$karyawanKey]["nama"] = $karyawanVal->nama;

                foreach ($kriteria as $kriteriaKey => $kriteriaVal) {
                    foreach ($penilaian as $pKey => $pVal) {
                        if ($penilaian[$pKey]["id_vendor"] == $karyawanVal->id && $penilaian[$pKey]["id_kriteria"] == $kriteriaVal->id) {
                            $data[$karyawanKey]["nilai"][] = [
                                "kriteria" => $penilaian[$pKey]["id_kriteria"],
                                "nilai" => $penilaian[$pKey]["nilai"]
                            ];
                        }
                    }
                }
            }

            $subKriteria = SubKriteria::all();

            $response = [
                "response" => true,
                "periode" => $request->periode,
                "semester" => $request->semester,
                "data" => $data,
                "subKriteria" => $subKriteria
            ];
            return response()->json($response);
        }
    }

    // Buat data penilaian
    public function create_penilaian_karyawan(Request $request)
    {
        $kriteria = Kriteria::where('periode', $request->periode)->where('semester', $request->semester)->get();
        $karyawan = Vendor::where('periode', $request->periode)->where('semester', $request->semester)->get();

        foreach ($kriteria as $kriteriaVal) {
            foreach ($karyawan as $karyawanVal) {
                Penilaian::create([
                    'periode' => $request->periode,
                    'semester' => $request->semester,
                    'id_vendor' => $karyawanVal->id,
                    'id_kriteria' => $kriteriaVal->id,
                    'nilai' => 0
                ]);
            }
        }

        $npenilaian = NPenilaian::where('periode', $request->periode)->where('semester', $request->semester)->get();
        foreach ($npenilaian as $np) {
            NPenilaian::where('id', $np->id)->delete();
        }

        $penilaian = Penilaian::where('periode', $request->periode)->where('semester', $request->semester)->get();

        foreach ($penilaian as $p) {
            $maxVal = Penilaian::where('periode', $request->periode)->where('semester', $request->semester)->where('id_kriteria', $p->id_kriteria)->max('nilai');
            $nilai = 0;
            if ($maxVal > 0) {
                $nilai = $p->nilai / $maxVal;
                $nilai = number_format((float)$nilai, 2, '.', '');
            }
            $np_id = NPenilaian::max('id');
            $np_id = $np_id + 1;
            NPenilaian::create([
                'id' => $np_id,
                'periode' => $p->periode,
                'semester' => $p->semester,
                'id_vendor' => $p->id_vendor,
                'id_kriteria' => $p->id_kriteria,
                'nilai' => $nilai
            ]);
        }

        return response()->json(["response" => "success"]);
    }

    // Ambil data update penilaian
    public function update_get_penilaian_karyawan(Request $request)
    {
        $penilaian = Penilaian::where('periode', $request->periode)->where('semester', $request->semester)->where('id_vendor', $request->id_vendor)->get();
        $subKriteria = SubKriteria::orderBy('nilai', 'DESC');
        $data = [];
        foreach ($penilaian as $p) {
            $data[] = [
                "id_kriteria" => $p->kriteria->id,
                "kriteria" => $p->kriteria->nama,
                "nilai" => $p->nilai,
                "sub_kriteria" => $p->kriteria->subKriteria
            ];
        }

        $response = [
            "response" => "success",
            "data" => $data,
            "subKriteria" => $subKriteria
        ];

        return response()->json($response);
    }

    // Ubah data penilaian
    public function update_penilaian_karyawan(Request $request)
    {
        foreach ($request->kriteria as $key => $value) {
            Penilaian::where('periode', $request->periode)->where('semester', $request->semester)->where('id_vendor', $request->id_vendor)->where('id_kriteria', $value["id_kriteria"])->update([
                "nilai" => $value["nilai"]
            ]);
        }

        $npenilaian = NPenilaian::where('periode', $request->periode)->where('semester', $request->semester)->get();
        foreach ($npenilaian as $np) {
            NPenilaian::where('id', $np->id)->delete();
        }

        $penilaian = Penilaian::where('periode', $request->periode)->where('semester', $request->semester)->get();

        foreach ($penilaian as $p) {
            $maxVal = Penilaian::where('periode', $request->periode)->where('semester', $request->semester)->where('id_kriteria', $p->id_kriteria)->max('nilai');
            $nilai = 0;
            if ($maxVal > 0) {
                $nilai = $p->nilai / $maxVal;
                $nilai = number_format((float)$nilai, 2, '.', '');
            }
            $np_id = NPenilaian::max('id');
            $np_id = $np_id + 1;
            NPenilaian::create([
                'id' => $np_id,
                'periode' => $p->periode,
                'semester' => $p->semester,
                'id_vendor' => $p->id_vendor,
                'id_kriteria' => $p->id_kriteria,
                'nilai' => $nilai
            ]);
        }

        return response()->json(["response" => "success"]);
    }

    // Ambil data normalisasi penilaian
    public function get_normalisasi_penilaian_karyawan(Request $request)
    {
        $npenilaian = NPenilaian::where('periode', $request->periode)->where('semester', $request->semester)->get();
        if (count($npenilaian) == 0) {
            return response()->json(["response" => false, "periode" => $request->periode]);
        } else {
            $karyawan = Vendor::where('periode', $request->periode)->where('semester', $request->semester)->get();
            $kriteria = Kriteria::where('periode', $request->periode)->where('semester', $request->semester)->get();
            $data = [];

            foreach ($karyawan as $karyawanKey => $karyawanVal) {
                $data[$karyawanKey]["id_vendor"] = $karyawanVal->id;
                $data[$karyawanKey]["nama"] = $karyawanVal->nama;

                foreach ($kriteria as $kriteriaKey => $kriteriaVal) {
                    foreach ($npenilaian as $npKey => $pVal) {
                        if ($npenilaian[$npKey]["id_vendor"] == $karyawanVal->id && $npenilaian[$npKey]["id_kriteria"] == $kriteriaVal->id) {
                            $data[$karyawanKey]["nilai"][] = [
                                "kriteria" => $npenilaian[$npKey]["id_kriteria"],
                                "nilai" => $npenilaian[$npKey]["nilai"]
                            ];
                        }
                    }
                }
            }

            $response = [
                "response" => true,
                "periode" => $request->periode,
                "data" => $data
            ];
            return response()->json($response);
        }
    }

    // Buat hasil akhir (implementasi Saw)
    public function get_final_result(Request $request)
    {
        $result = [];

        $karyawan = Vendor::where('periode', $request->periode)->where('semester', $request->semester)->get();
        foreach ($karyawan as $kKey => $kVal) {
            $result[] = [
                "id_karyawan" => $kVal->id,
                "nama" => $kVal->nama
            ];

            $npenilaian = NPenilaian::where('periode', $request->periode)->where('semester', $request->semester)->where('id_vendor', $kVal->id)->get();
            $nkriteria = NKriteria::where('periode', $request->periode)->where('semester', $request->semester)->get();
            $nilai = 0;
            foreach ($npenilaian as $npKey => $npVal) {
                $bobot = 0;

                foreach ($nkriteria as $nkKey => $nkVal) {
                    if ($nkVal->id == $npVal->id_kriteria) {
                        $bobot = $nkVal->bobot;
                    }
                }

                $nilai = $nilai + ($npVal->nilai * $bobot);
            }

            $result[$kKey]["nilai"] = number_format((float)$nilai, 2, '.', '');
        }

        usort($result, function ($a, $b) {
            return $b['nilai'] <=> $a['nilai'];
        });

        return response()->json($result);
    }
}
