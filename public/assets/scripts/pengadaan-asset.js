$('#periode, #semester').on('change', function(){
    let params = {
        "periode": $('#periode').val(),
        "semester": $('#semester').val(),
    }

    let valid = true
    if (params.periode.length == 0 || params.semester.length == 0) {
        valid = false
    }

    if (valid) {
        $('#asset').html(`<div class="loader">
                                    <div class="loader4"></div>
                                    <h5 style="margin-top: 2.5rem">Loading data</h5>
                                </div>`)

        $('#vendor').html(`<div class="loader">
                                    <div class="loader4"></div>
                                    <h5 style="margin-top: 2.5rem">Loading data</h5>
                                </div>`)
        getAsset(params)
    }
})

function getAsset(params) {
    ajaxRequest.post({
        "url": "/pengadaan-asset/get",
        "data": params
    }).then(res => {
        let assetHtml, actions, dataAsset
        if (res.status == null || res.status == "pending") {
            if (res.status == null) {
                actions = `<div class="asset-action">
                            <button class="btn btn-primary" data-toggle="modal" data-target="#modalInputAsset"><i class="fas fa-plus" style="margin-top: 3px;"></i><span>Input aset</span></button>
                        </div>`
            } else {
                actions = `<div class="asset-action">
                            <button class="btn btn-primary" data-toggle="modal" data-target="#modalInputAsset"><i class="fas fa-plus" style="margin-top: 3px;"></i><span>Input aset</span></button>
                            <button class="btn btn-success" data-toggle="modal" data-target="#modalPengajuan"><i class="fas fa-check" style="margin-top: 3px;"></i><span>Ajukan</span></button>
                        </div>`
            }

            $('#btn-add-vendor').hide()
        } else if (res.status == "pengajuan") {
            actions = `<div class="status pengajuan">
                            <i class="far fa-info-circle" style="margin-top: 3px;"></i>
                            <span>Pengadaan aset sedang dalam pengajuan</span>
                        </div>`

            $('#btn-add-vendor').hide()
        } else if (res.status == "diterima") {
            actions = `<div class="status diterima">
                            <i class="far fa-check-circle" style="margin-top: 3px;"></i>
                            <span>Pengadaan aset disetujui</span>
                        </div>`

            $('#btn-add-vendor').show()
        } else if (res.status == "ditolak") {
            actions = `<div class="asset-action">
                            <button class="btn btn-primary" data-toggle="modal" data-target="#modalInputAsset"><i class="fas fa-plus" style="margin-top: 3px;"></i><span>Input aset</span></button>
                            <button class="btn btn-success" id="btn-ajukan"><i class="fas fa-check" style="margin-top: 3px;"></i><span>Ajukan</span></button>
                        </div>
                        <br>
                        <div class="status ditolak">
                            <i class="far fa-times-circle" style="margin-top: 3px;"></i>
                            <span>Pengadaan aset ditolak</span>
                        </div>`

            $('#btn-add-vendor').hide()
        }

        if (res.asset.length == 0) {
            dataAsset = `<br>
                        <div class="loader">
                            <i class="fas fa-ban" style="font-size: 5rem; opacity: .5"></i>
                            <h5 style="margin-top: 2.5rem; opacity: .75">Belum ada data aset</h5>
                        </div>`
        } else {
            let tdAsset = ``
            res.asset.forEach((v, i) => {
                tdAsset += `<tr>
                                <td>${i + 1}</td>
                                <td>${v.barang}</td>
                                <td>${v.jumlah} Unit</td>
                                ${ (res.status == "pending") ? `<td style="width: 40px;"><button class="btn-table-action delete delete-asset"
                                                                                            data-toggle="modal"
                                                                                            data-target="#modalDeleteAsset"
                                                                                            data-barang="${v.barang}"
                                                                                            data-id="${v.id}"><i class="fas fa-trash-alt"></i>
                                                                                        </button></td>` : "" }
                            </tr>`
            })

            dataAsset = `<br>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Barang</th>
                                    <th>Unit</th>
                                    ${ (res.status == "pending") ? "<th></th>" : "" }
                                </tr>
                            </thead>
                            <tbody>
                                ${tdAsset}
                            </tbody>
                        </table>`
        }

        assetHtml = `${actions}${dataAsset}`
        $('#asset').html(assetHtml)

        if (res.vendor.length > 0) {
            let tdVendor = ``
            res.vendor.forEach((v, i) => {
                tdVendor += `<tr>
                                <td>${v.periode}</td>
                                <td>${v.semester}</td>
                                <td>${v.nama}</td>
                                <td style="width: 40px;">
                                    <button class="btn-table-action delete delete-vendor"
                                        data-toggle="modal"
                                        data-target="#modalDeleteVendor"
                                        data-vendor="${v.nama}"
                                        data-id="${v.id}"><i class="fas fa-trash-alt"></i>
                                    </button>
                                </td>
                            </tr>`
            });

            $('#vendor').html(`<table class="table">
                                    <thead>
                                        <tr>
                                            <th>Periode</th>
                                            <th>Semester</th>
                                            <th>Nama vendor</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${tdVendor}
                                    </tbody>
                                </table>`)
        } else {
            $('#vendor').html(`<div class="loader">
                                    <i class="fas fa-ban" style="font-size: 5rem; opacity: .5"></i>
                                    <h5 style="margin-top: 2.5rem; opacity: .75">Belum ada data vendor</h5>
                                </div>`)
        }

        assetDataFn()
    })
}

function assetDataFn() {
    $('#btn-ajukan').on('click', function() {
        console.log('ajukan');
    })

    $('.delete-asset').on('click', function(){
        $('#delete-warning-message').html(`Hapus aset ${$(this).data('barang')}`)
        $('#delete-id-asset').val($(this).data('id'))
    })

    $('.delete-vendor').on('click', function() {
        $('#delete-vendor-warning-message').html(`Hapus vendor ${$(this).data('vendor')}`)
        $('#delete-id-vendor').val($(this).data('id'))
    })
}

$('#btn-input-asset').on('click', function(){
    if ($('#input-asset-barang').val().length == 0) {
        alert('Masukkan barang')
    } else if ($('#input-asset-jumlah').val().length == 0) {
        alert('Masukkan jumlah')
    } else {
        $(this).attr('disabled', true)
        let params = {
            "periode": $('#periode').val(),
            "semester": $('#semester').val(),
            "barang": $('#input-asset-barang').val(),
            "jumlah": $('#input-asset-jumlah').val()
        }

        ajaxRequest.post({
            "url": "/pengadaan-asset/input",
            "data": params
        }).then(res => {
            getAsset({
                "periode": $('#periode').val(),
                "semester": $('#semester').val(),
            })
            $('#modalInputAsset').modal('hide')
            $('#input-asset-barang').val('')
            $('#input-asset-jumlah').val('')
            $('#btn-input-asset').removeAttr('disabled')
            toastr.option = {
                "timeout": "5000"
            }
            toastr["success"](res.message)
        })
    }
})

$('#btn-delete-asset').on('click', function(){
    $(this).attr('disabled', true)
    ajaxRequest.get({
        "url": `/pengadaan-asset/delete/${$('#delete-id-asset').val()}`
    }).then(res => {
        getAsset({
            "periode": $('#periode').val(),
            "semester": $('#semester').val(),
        })
        $('#modalDeleteAsset').modal('hide')
        $('#btn-delete-asset').removeAttr('disabled')
        toastr.option = {
            "timeout": "5000"
        }
        toastr["success"](res.message)
    })
})

$('#btn-add-vendor').on('click', function(){
    $('#input-vendor-periode').val($('#periode').val())
    $('#input-vendor-semester').val($('#semester').val())
})

$('#btn-input-vendor').on('click', function(){
    if ($('#input-vendor-name').val().length == 0) {
        alert('Masukkan nama vendor')
    } else {
        $('#btn-input-vendor').attr('disabled', true)
        let params = {
            "periode": $('#input-vendor-periode').val(),
            "semester": $('#input-vendor-semester').val(),
            "name": $('#input-vendor-name').val()
        }

        ajaxRequest.post({
            "url": "/pengadaan-asset/vendor/input",
            "data": params
        }).then(res => {
            if (res.response == "success") {
                getAsset({
                    "periode": $('#periode').val(),
                    "semester": $('#semester').val(),
                })
                $('#btn-input-vendor').removeAttr('disabled')
                $('#modalInputVendor').modal('hide')
                $('#input-vendor-name').val('')
                toastr.option = {
                    "timeout": "5000"
                }
                toastr["success"](res.message)
            } else if (res.response == "failed") {
                $('#btn-input-vendor').removeAttr('disabled')
                $('#modalInputVendor').modal('hide')
                $('#input-vendor-name').val('')
                toastr.option = {
                    "timeout": "5000"
                }
                toastr["error"](res.message)
            }
        })
    }
})

$('#btn-delete-vendor').on('click', function(){
    $(this).attr('disabled', true)
    ajaxRequest.get({
        "url": `/pengadaan-asset/vendor/delete/${$('#delete-id-vendor').val()}`
    }).then(res => {
        getAsset({
            "periode": $('#periode').val(),
            "semester": $('#semester').val(),
        })
        $('#modalDeleteVendor').modal('hide')
        $('#btn-delete-vendor').removeAttr('disabled')
        toastr.option = {
            "timeout": "5000"
        }
        toastr["success"](res.message)
    })
})

$('#btn-ajukan-pengadaan-aset').on('click', function(){
    $(this).attr('disabled', true)
    let params = {
        "periode": $('#periode').val(),
        "semester": $('#semester').val(),
    }

    ajaxRequest.post({
        "url": "/pengadaan-asset/pengajuan/send",
        "data": params
    }).then(res => {
        getAsset({
            "periode": $('#periode').val(),
            "semester": $('#semester').val(),
        })
        $('#modalPengajuan').modal('hide')
        $('#btn-ajukan-pengadaan-aset').removeAttr('disabled', true)
        toastr.option = {
            "timeout": "5000"
        }
        toastr["success"](res.message)
    })
})