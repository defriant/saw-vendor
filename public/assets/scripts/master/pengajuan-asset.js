getPengajuan()

function getPengajuan() {
    ajaxRequest.get({ "url": "/master/pengajuan-asset/get" }).then(res => {
        if (res.pengajuan.length > 0) {
            let tdPengajuan = ``
            res.pengajuan.forEach((p, i) => {
                tdPengajuan += `<tr>
                                    <td>${i + 1}</td>
                                    <td>${p.periode}</td>
                                    <td>${p.semester}</td>
                                    <td style="width: 40px;"><button class="btn-table-action info detail-pengajuan"
                                                                data-toggle="modal"
                                                                data-target="#modalPengajuanDetail"
                                                                data-periode="${p.periode}"
                                                                data-semester="${p.semester}">
                                                                <i class="fas fa-eye"></i>
                                                            </button>
                                    </td>
                                </tr>`

                $('#panel-body-pengajuan').html(`<table class="table">
                                                    <thead>
                                                        <tr>
                                                            <th>#</th>
                                                            <th>Periode</th>
                                                            <th>Semester</th>
                                                            <th></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        ${tdPengajuan}
                                                    </tbody>
                                                </table>`)

                btnDetailPengajuanFn()
            });
        } else {
            $('#panel-body-pengajuan').html(`<div class="loader" id="hasil-loader">
                                                <i class="fas fa-ban" style="font-size: 5rem; opacity: .5"></i>
                                                <h5 style="margin-top: 2.5rem; opacity: .75">Belum ada data pengajuan</h5>
                                            </div>`)
        }
    })
}

function btnDetailPengajuanFn() {
    $('.detail-pengajuan').unbind('click')
    $('.detail-pengajuan').on('click', function(){
        $('#modalPengajuanDetail .modal-footer').hide()
        $('#periode').val($(this).data('periode'))
        $('#semester').val($(this).data('semester'))
        $('#pengajuan-asset').html(`<div class="loader">
                                        <div class="loader4"></div>
                                    </div>`)

        ajaxRequest.post({
            "url": "/master/pengajuan-asset/asset/get",
            "data": {
                "periode": $(this).data('periode'),
                "semester": $(this).data('semester')
            }
        }).then(res => {
            let tdAsset = ``
            res.asset.forEach((v, i) => {
                tdAsset += `<tr>
                                <td>${i + 1}</td>
                                <td>${v.barang}</td>
                                <td>${v.jumlah} Unit</td>
                            </tr>`
            })

            $('#pengajuan-asset').html(`<table class="table">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Aset</th>
                                                    <th>Unit</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                ${tdAsset}
                                            </tbody>
                                        </table>`)

            $('#modalPengajuanDetail .modal-footer').show()
        })
    })
}

$('#terima-pengajuan').on('click', function(){
    $('#modalPengajuanDetail .modal-footer button').attr('disabled', true)
    ajaxRequest.post({
        "url": "/master/pengajuan-asset/terima",
        "data": {
            "periode": $('#periode').val(),
            "semester": $('#semester').val()
        }
    }).then(res => {
        getPengajuan()
        $('#modalPengajuanDetail').modal('hide')
        $('#modalPengajuanDetail .modal-footer button').removeAttr('disabled')
        toastr.option = {
            "timeout": "5000"
        }
        toastr["success"](res.message)
    })
})

$('#tolak-pengajuan').on('click', function(){
    $('#modalPengajuanDetail .modal-footer button').attr('disabled', true)
    ajaxRequest.post({
        "url": "/master/pengajuan-asset/tolak",
        "data": {
            "periode": $('#periode').val(),
            "semester": $('#semester').val()
        }
    }).then(res => {
        getPengajuan()
        $('#modalPengajuanDetail').modal('hide')
        $('#modalPengajuanDetail .modal-footer button').removeAttr('disabled')
        toastr.option = {
            "timeout": "5000"
        }
        toastr["info"](res.message)
    })
})