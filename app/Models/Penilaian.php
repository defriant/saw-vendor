<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Penilaian extends Model
{
    use HasFactory;

    protected $table = 'penilaian';
    protected $fillable = [
        'periode',
        'semester',
        'id_vendor',
        'id_kriteria',
        'nilai'
    ];

    public function karyawan()
    {
        return $this->hasOne(Karyawan::class, 'id', 'id_karyawan');
    }

    public function vendor()
    {
        return $this->hasOne(Vendor::class, 'id', 'id_vendor');
    }

    public function kriteria()
    {
        return $this->hasOne(Kriteria::class, 'id', 'id_kriteria');
    }
}
