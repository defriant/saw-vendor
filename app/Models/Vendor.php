<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vendor extends Model
{
    use HasFactory;

    protected $table = "vendor";
    protected $fillable = [
        "periode",
        "semester",
        "nama"
    ];

    public function penilaian()
    {
        return $this->hasMany(Penilaian::class, 'id_vendor', 'id');
    }
}
