<?php

use App\Http\Controllers\MasterController;
use App\Http\Controllers\WebController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    if (Auth::guest()) {
        return view('login');
    } else {
        if (Auth::user()->role == "admin") {
            return redirect('/dashboard');
        } else if (Auth::user()->role == "master") {
            return redirect('/master/dashboard');
        } else {
            echo "Undefined Role !";
        }
    }
})->name('index');

Route::get('/logout', [WebController::class, 'logout']);

Route::middleware(['guest'])->group(function () {
    Route::post('/login-attempt', [WebController::class, 'login_attempt']);
});

Route::middleware(['auth', 'adminRole'])->group(function () {
    Route::get('/dashboard', [WebController::class, 'dashboard'])->name('dashboard');

    Route::get('/pengadaan-asset', [WebController::class, 'pengadaan_asset']);
    Route::post('/pengadaan-asset/get', [WebController::class, 'pengadaan_asset_get']);
    Route::post('/pengadaan-asset/input', [WebController::class, 'pengadaan_asset_input']);
    Route::get('/pengadaan-asset/delete/{id}', [WebController::class, 'pengadaan_asset_delete']);
    Route::post('/pengadaan-asset/vendor/input', [WebController::class, 'pengadaan_asset_vendor_input']);
    Route::get('/pengadaan-asset/vendor/delete/{id}', [WebController::class, 'pengadaan_asset_vendor_delete']);
    Route::post('/pengadaan-asset/pengajuan/send', [WebController::class, 'pengadaan_asset_pengajuan']);

    Route::get('/penilaian-vendor', function () {
        return view('penilaian-kinerja');
    });

    Route::get('/kriteria', function () {
        return view('kriteria');
    });

    Route::get('/kriteria/get/{periode}/{semester}', [WebController::class, 'get_kriteria']);
    Route::post('/kriteria/add', [WebController::class, 'add_kriteria']);
    Route::post('/kriteria/update', [WebController::class, 'update_kriteria']);
    Route::post('/kriteria/delete', [WebController::class, 'delete_kriteria']);
    Route::get('/kriteria-normalisasi/get/{periode}/{semester}', [WebController::class, 'get_kriteria_normalisasi']);
    Route::post('/kriteria/sub-kriteria/get', [WebController::class, 'kriteria_get_sub']);

    Route::get('/sub-kriteria', function () {
        return view('sub-kriteria');
    });
    Route::get('/sub-kriteria/get', [WebController::class, 'get_sub_kriteria']);
    Route::post('/sub-kriteria/add', [WebController::class, 'add_sub_kriteria']);
    Route::post('/sub-kriteria/update', [WebController::class, 'update_sub_kriteria']);
    Route::post('/sub-kriteria/delete', [WebController::class, 'delete_sub_kriteria']);

    Route::post('/penilaian-karyawan/get', [WebController::class, 'get_penilaian_karyawan']);
    Route::post('/penilaian-karyawan/create', [WebController::class, 'create_penilaian_karyawan']);
    Route::post('/penilaian-karyawan/update/get', [WebController::class, 'update_get_penilaian_karyawan']);
    Route::post('/penilaian-karyawan/update', [WebController::class, 'update_penilaian_karyawan']);

    Route::post('/normalisasi-penilaian-karyawan/get', [WebController::class, 'get_normalisasi_penilaian_karyawan']);
});

Route::middleware(['auth', 'masterRole'])->group(function () {
    Route::get('/master/dashboard', function () {
        return view('master.dashboard');
    });
    Route::get('/master/pengajuan-aset', function () {
        return view('master.pengajuan-asset');
    });
    Route::get('/master/pengajuan-asset/get', [MasterController::class, 'get_pengajuan']);
    Route::post('/master/pengajuan-asset/asset/get', [MasterController::class, 'get_pengajuan_asset']);
    Route::post('/master/pengajuan-asset/terima', [MasterController::class, 'terima_pengajuan']);
    Route::post('/master/pengajuan-asset/tolak', [MasterController::class, 'tolak_pengajuan']);
});

Route::middleware('auth')->group(function () {
    Route::post('/penilaian-karyawan/final-result/get', [WebController::class, 'get_final_result']);

    Route::get('/hasil', function () {
        return view('hasil');
    });
});
