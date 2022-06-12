@extends('layouts.master')
@section('content')

<div class="row">
    <div class="col-md-6">
        <div class="panel panel-headline">
            {{-- Penilaian --}}
            <div class="panel-heading">
                <h3 class="panel-title">Pengadaan aset</h3>
                <div class="right no-print">
                    {{-- <button type="button" id="btn-print-hasil"><i class="far fa-print"></i>&nbsp; Print</button> --}}
                </div>
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
                <div class="row">
                    <div class="col-md-12" id="asset">
                        <div class="loader">
                            <i class="fas fa-ban" style="font-size: 5rem; opacity: .5"></i>
                            <h5 style="margin-top: 2.5rem; opacity: .75">Belum ada data yang dipilih</h5>
                        </div>
                    </div>
                </div>
                <br>
            </div>
        </div>
    </div>

    <div class="col-md-6">
        <div class="panel panel-headline">
            {{-- Penilaian --}}
            <div class="panel-heading">
                <h3 class="panel-title">Vendor</h3>
                <div class="right no-print">
                    <button type="button" id="btn-add-vendor" style="display: none;" data-toggle="modal" data-target="#modalInputVendor"><i class="fas fa-plus"></i>&nbsp; Input vendor</button>
                </div>
            </div>
            <div class="panel-body" id="vendor">
                <div class="loader">
                    <i class="fas fa-ban" style="font-size: 5rem; opacity: .5"></i>
                    <h5 style="margin-top: 2.5rem; opacity: .75">Belum ada data vendor</h5>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modalInputAsset" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                        aria-hidden="true">×</span></button>
                <h4 class="modal-title" id="myModalLabel">Input aset</h4>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-sm-12 col-md-6" style="margin-bottom: 1.25rem">
                        <p>Barang</p>
                        <input type="text" id="input-asset-barang" class="form-control">
                    </div>
                    <div class="col-sm-12 col-md-6" style="margin-bottom: 1.25rem">
                        <p>Jumlah</p>
                        <input type="number" id="input-asset-jumlah" class="form-control">
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="btn-input-asset">Input</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modalDeleteAsset" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">
            <div class="modal-body">
                <h4 class="text-center" style="margin-top: 3rem" id="delete-warning-message"></h4>
                <input type="hidden" id="delete-id-asset">
                <div style="margin-top: 5rem; text-align: center">
                    <button type="button" class="btn btn-danger" id="btn-delete-asset">Hapus</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">Batal</button>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modalInputVendor" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                        aria-hidden="true">×</span></button>
                <h4 class="modal-title" id="myModalLabel">Input vendor</h4>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-sm-12 col-md-6" style="margin-bottom: 1.25rem">
                        <p>Periode</p>
                        <input type="text" id="input-vendor-periode" class="form-control" readonly>
                    </div>
                    <div class="col-sm-12 col-md-6" style="margin-bottom: 1.25rem">
                        <p>Semester</p>
                        <input type="text" id="input-vendor-semester" class="form-control" readonly>
                    </div>
                    <div class="col-sm-12" style="margin-bottom: 1.25rem">
                        <p>Nama vendor</p>
                        <input type="text" id="input-vendor-name" class="form-control">
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="btn-input-vendor">Input</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modalDeleteVendor" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">
            <div class="modal-body">
                <h4 class="text-center" style="margin-top: 3rem" id="delete-vendor-warning-message"></h4>
                <input type="hidden" id="delete-id-vendor">
                <div style="margin-top: 5rem; text-align: center">
                    <button type="button" class="btn btn-danger" id="btn-delete-vendor">Hapus</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">Batal</button>
                </div>
            </div>
        </div>
    </div>
</div>

@endsection
