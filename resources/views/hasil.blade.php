@extends('layouts.master')
@section('content')
<div class="row">
    <div class="col-md-12">
        <div class="panel panel-headline" id="panel-prediksi-loading">
            {{-- Penilaian --}}
            <div class="panel-heading">
                <h3 class="panel-title">Peringkat vendor berdasarkan penilaian</h3>
                <div class="right no-print">
                    <button type="button" id="btn-print-hasil"><i class="far fa-print"></i>&nbsp; Print</button>
                </div>
            </div>
            <div class="panel-body" id="print-area">
                <div class="row">
                    <div class="col-md-3">
                        <p>Tahun</p>
                        <input type="text" class="form-control yearpicker" id="periode" readonly>
                    </div>
                    <div class="col-md-3">
                        <p>Semester</p>
                        <select class="form-control" id="semester">
                            <option value=""></option>
                            <option value="Ganjil">Ganjil</option>
                            <option value="Genap">Genap</option>
                        </select>
                    </div>
                </div>
                {{-- <p>Periode penilaian :</p>
                <div class="input-group" style="width: 300px">
                    <input class="form-control" type="text" id="periode-penilaian" readonly>
                    <span class="input-group-btn no-print"><button class="btn btn-primary" type="button" id="search-hasil"><i class="fas fa-search"></i></button></span>
                </div> --}}
                <br>
                <br>
                <div id="penilaian">
                    <div class="loader" id="hasil-loader">
                        <i class="fas fa-ban" style="font-size: 5rem; opacity: .5"></i>
                        <h5 style="margin-top: 2.5rem; opacity: .75">Belum ada data yang dipilih</h5>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modalDeleteKriteria" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">
            <div class="modal-body">
                <h4 class="text-center" style="margin-top: 3rem" id="delete-warning-message"></h4>
                <input type="hidden" id="delete_id_kriteria">
                <div style="margin-top: 5rem; text-align: center">
                    <button type="button" class="btn btn-danger" id="btn-delete-data">Hapus</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">Batal</button>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modalUpdatePenilaian" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            
        </div>
    </div>
</div>
@endsection