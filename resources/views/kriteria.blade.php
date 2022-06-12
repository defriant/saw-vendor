@extends('layouts.master')
@section('content')
<div class="row">
    <div class="col-md-6">
        <div class="panel panel-headline">
            <div class="panel-heading">
                <h3 class="panel-title">Alternatif / Kriteria</h3>
            </div>
            <div class="panel-body">
                <div class="row">
                    <div class="col-md-6">
                        <p>Tahun</p>
                        <input type="text" class="form-control yearpicker" id="periode" readonly>
                    </div>
                    <div class="col-md-6">
                        <p>Semester</p>
                        <select class="form-control" id="semester">
                            <option value=""></option>
                            <option value="Ganjil">Ganjil</option>
                            <option value="Genap">Genap</option>
                        </select>
                    </div>
                </div>
                <hr>
                <div id="panel-body-kriteria">
                    <div class="loader" id="hasil-loader">
                        <i class="fas fa-ban" style="font-size: 5rem; opacity: .5"></i>
                        <h5 style="margin-top: 2.5rem; opacity: .75">Belum ada data yang dipilih</h5>
                    </div>
                </div>
                {{-- <div class="loader">
                    <div class="loader4"></div>
                    <h5 style="margin-top: 2.5rem">Loading data</h5>
                </div> --}}
                {{-- <table class="table">
                    <thead>
                        <tr>
                            <th>Kriteria</th>
                            <th>Bobot</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody id="data-kriteria">
                        
                    </tbody>
                </table>
                <button class="btn btn-info" id="btn-add-kriteria"><i class="far fa-plus"></i> &nbsp; Tambah Kriteria</button> --}}
            </div>
        </div>
    </div>
    <div class="col-md-6">
        <div class="panel panel-headline">
            <div class="panel-heading">
                <h3 class="panel-title" id="sub-kriteria-title">Sub Kriteria &nbsp;<span></span></h3>
            </div>
            <div class="panel-body" id="panel-body-sub-kriteria">
                <div class="loader">
                    <i class="fas fa-ban" style="font-size: 5rem; opacity: .5"></i>
                    <h5 style="margin-top: 2.5rem; opacity: .75">Belum ada data yang dipilih</h5>
                </div>
                {{-- <div class="loader">
                    <div class="loader4"></div>
                    <h5 style="margin-top: 2.5rem">Loading data</h5>
                </div> --}}

                {{-- <table class="table">
                    <thead>
                        <tr>
                            <th>Kriteria</th>
                            <th>Bobot Ternormalisasi</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody id="data-kriteria-normalisasi">
                        
                    </tbody>
                </table>
                <button class="btn btn-info" style="visibility: hidden"><i class="far fa-plus"></i></button> --}}
            </div>
        </div>
    </div>
</div>
<div class="row">
    <div class="col-md-6">
        <div class="panel panel-headline">
            <div class="panel-heading">
                <h3 class="panel-title">Normalisasi Kriteria</h3>
            </div>
            <div class="panel-body" id="panel-body-normalisasi-kriteria">
                <div class="loader">
                    <i class="fas fa-ban" style="font-size: 5rem; opacity: .5"></i>
                    <h5 style="margin-top: 2.5rem; opacity: .75">Belum ada data yang dipilih</h5>
                </div>
                {{-- <div class="loader">
                    <div class="loader4"></div>
                    <h5 style="margin-top: 2.5rem">Loading data</h5>
                </div> --}}

                {{-- <table class="table">
                    <thead>
                        <tr>
                            <th>Kriteria</th>
                            <th>Bobot Ternormalisasi</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody id="data-kriteria-normalisasi">
                        
                    </tbody>
                </table>
                <button class="btn btn-info" style="visibility: hidden"><i class="far fa-plus"></i></button> --}}
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

<div class="modal fade" id="modalDeleteSubKriteria" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">
            <div class="modal-body">
                <h4 class="text-center" style="margin-top: 3rem" id="delete-warning-sub-kriteria-message"></h4>
                <input type="hidden" id="delete_id_sub_kriteria">
                <div style="margin-top: 5rem; text-align: center">
                    <button type="button" class="btn btn-danger" id="btn-delete-sub-kriteria-data">Hapus</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">Batal</button>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection