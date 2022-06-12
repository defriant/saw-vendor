<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubKriteria extends Model
{
    use HasFactory;

    protected $table = 'sub_kriteria';
    protected $fillable = [
        'id',
        'id_kriteria',
        'nama',
        'nilai'
    ];
    public $incrementing = false;
}
