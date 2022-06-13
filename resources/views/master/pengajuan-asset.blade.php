@extends('layouts.master')
@section('content')
<div class="col-md-6">
    <div class="panel panel-headline">
        <div class="panel-heading">
            <h3 class="panel-title">Pengajuan pengadaan aset</h3>
        </div>
        <div class="panel-body" id="panel-body-pengajuan">
            <div class="loader">
                <div class="loader4"></div>
                <h5 style="margin-top: 2.5rem">Loading data</h5>
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

<div class="modal fade" id="modalPengajuanDetail" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                        aria-hidden="true">×</span></button>
                <h4 class="modal-title" id="myModalLabel">Pengajuan pengadaan aset</h4>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-6">
                        <p>Tahun</p>
                        <input type="text" class="form-control" id="periode" disabled>
                    </div>
                    <div class="col-md-6">
                        <p>Semester</p>
                        <input type="text" class="form-control" id="semester" disabled>
                    </div>
                </div>
                <hr>
                <div id="pengajuan-asset">

                </div>
            </div>
            <div class="modal-footer" style="display: none">
                <div style="float: left;">
                    <button type="button" class="btn btn-success" id="terima-pengajuan"><i class="fas fa-check"></i> Terima</button>
                    <button type="button" class="btn btn-danger" id="tolak-pengajuan"><i class="fas fa-times"></i> Tolak</button>
                </div>
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
@endsection