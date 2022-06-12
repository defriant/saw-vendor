<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NKriteria extends Model
{
    use HasFactory;

    protected $table = 'n_kriteria';
    protected $fillable = [
        'id',
        'periode',
        'semester',
        'nama',
        'bobot'
    ];
    public $incrementing = false;
}
