@extends('layouts.master')
@section('content')
<div class="row">
    <div class="col-md-6">
        <div class="panel panel-headline">
            <div class="panel-heading">
                <h3 class="panel-title">Sub Kriteria</h3>
            </div>
            <div class="panel-body" id="panel-body-sub-kriteria">
                <div class="loader">
                    <div class="loader4"></div>
                    <h5 style="margin-top: 2.5rem">Loading data</h5>
                </div>
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