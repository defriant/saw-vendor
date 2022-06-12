let normalisasiKriteria = []

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
        getKriteria(params).then(function(result){
            kriteriaComponent(result)
        })
        
        getNormalisasiKriteria(params).then(function(result){
            normalisasiKriteriaComponent(result)
        })
    }
})

function getKriteria(params) {
    $('#sub-kriteria-title span').html('')
    $('#panel-body-sub-kriteria').html(`<div class="loader">
                                            <i class="fas fa-ban" style="font-size: 5rem; opacity: .5"></i>
                                            <h5 style="margin-top: 2.5rem; opacity: .75">Belum ada data yang dipilih</h5>
                                        </div>`)
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'get',
            url: `/kriteria/get/${params.periode}/${params.semester}`,
            success:function(result){
                resolve(result)
            }
        })
    })
}

function kriteriaComponent(result) {
    $('#panel-body-kriteria').html(`<table class="table">
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
                                    <button class="btn btn-info" id="btn-add-kriteria"><i class="far fa-plus"></i> &nbsp; Tambah Kriteria</button>`)

    $('#data-kriteria').empty()
    $('#thead-penilaian').empty()
    $('#thead-normalisasi-penilaian').empty()

    $('#thead-penilaian').append(`<th>Karyawan</th>`)
    $('#thead-normalisasi-penilaian').append(`<th>Karyawan</th>`)
    $.each(result.data, function(i, v){
        $('#data-kriteria').append(`<tr>
                                        <td style="width: 50%; cursor: pointer;" class="choose-kriteria" data-id="${v.id}" data-nama="${v.nama}">${v.nama}</td>
                                        <td style="width: 20%">${v.bobot}</td>
                                        <td style="width: 30%; text-align: right">
                                            <button class="btn-table-action edit update-kriteria" data-id="${v.id}" data-nama="${v.nama}" data-bobot="${v.bobot}"><i class="fas fa-pen"></i></button> &nbsp;
                                            <button class="btn-table-action delete delete-kriteria" data-id="${v.id}" data-nama="${v.nama}"><i class="fas fa-trash-alt"></i></button>
                                        </td>
                                    </tr>`)

        $('#thead-penilaian').append(`<th>${v.nama}</th>`)
        $('#thead-normalisasi-penilaian').append(`<th>${v.nama}</th>`)
    })
    $('#thead-penilaian').append(`<th></th>`)

    buttonAddKriteria()
    buttonUpdateKriteria()
    buttonDeleteKriteria()
    buttonSelectKriteria()
}

let kriteriaActive = null
function buttonSelectKriteria() {
    $('.choose-kriteria').unbind('click')
    $('.choose-kriteria').on('click', function(){
        $('#sub-kriteria-title span').html(`(${$(this).data('nama')})`)
        kriteriaActive = $(this).data('id')
        getSubKriteria(kriteriaActive)
    })
}

function getSubKriteria(id) {
    ajaxRequest.post({
        "url": "/kriteria/sub-kriteria/get",
        "data": {
            "id_kriteria": id
        }
    }).then(result => {
        $('#panel-body-sub-kriteria').html(`<table class="table">
                                    <thead>
                                        <tr>
                                            <th>Sub Kriteria</th>
                                            <th>Nilai</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody id="data-sub-kriteria">
                                        
                                    </tbody>
                                </table>
                                <button class="btn btn-info" id="btn-add-sub-kriteria"><i class="far fa-plus"></i> &nbsp; Tambah Sub Kriteria</button>`)

        $('#data-sub-kriteria').empty()
        $('#thead-penilaian').empty()

        $('#thead-penilaian').append(`<th>Karyawan</th>`)
        $.each(result, function(i, v){
            $('#data-sub-kriteria').append(`<tr>
                                            <td style="width: 50%">${v.nama}</td>
                                            <td style="width: 20%">${v.nilai}</td>
                                            <td style="width: 30%; text-align: right">
                                                <button class="btn-table-action edit update-sub-kriteria" data-id="${v.id}" data-nama="${v.nama}" data-nilai="${v.nilai}"><i class="fas fa-pen"></i></button> &nbsp;
                                                <button class="btn-table-action delete delete-sub-kriteria" data-id="${v.id}" data-nama="${v.nama}"><i class="fas fa-trash-alt"></i></button>
                                            </td>
                                        </tr>`)
        })

        buttonAddSubKriteria()
        buttonUpdateSubKriteria()
        buttonDeleteSubKriteria()
    })
}

function buttonUpdateKriteria() {
    $('.update-kriteria').unbind('click')
    $('.update-kriteria').on('click', function(){
        let oldRowKriteria = $(this).parent().parent().html()
        let kriteriaRow = $(this).parent().parent()
        let kriteriaId = $(this).data('id')
        let kriteriaNama = $(this).data('nama')
        let kriteriaBobot = $(this).data('bobot')
        
        kriteriaRow.html(`<td style="width: 50%"><input type="text" class="form-control" placeholder="Nama kriteria" id="update-kriteria-nama" value="${kriteriaNama}"></td>
                            <td style="width: 20%"><input type="text" class="form-control" placeholder="Bobot" id="update-kriteria-bobot" value="${kriteriaBobot}"></td>
                            <td style="width: 30%; text-align: right">
                                <button class="btn-table-action acc" id="update-kriteria"><i class="fas fa-check"></i></button> &nbsp;
                                <button class="btn-table-action delete" id="cancel-update-kriteria"><i class="fas fa-times"></i></button>
                            </td>`)
        $('#update-kriteria-nama').focus()
        $('.update-kriteria').addClass('btn-hide')
        $('.delete-kriteria').addClass('btn-hide')
        $('#btn-add-kriteria').addClass('btn-hide')

        $('#update-kriteria').unbind('click')
        $('#update-kriteria').on('click', function(){
            if ($('#update-kriteria-nama').val().length == 0) {
                alert('Masukkan nama kriteria')
            }else if($('#update-kriteria-bobot').val().length == 0){
                alert('Masukkan bobot')
            }else{
                $('#update-kriteria').attr('disabled', 'disabled')
                $('#cancel-update-kriteria').attr('disabled', 'disabled')
                $.ajax({
                    type: 'post',
                    url: '/kriteria/update',
                    data: {
                        "id": kriteriaId,
                        "nama": $('#update-kriteria-nama').val(),
                        "bobot": $('#update-kriteria-bobot').val()
                    },
                    success:function(result){
                        if (result.response == "success") {
                            getKriteria({
                                "periode": $('#periode').val(),
                                "semester": $('#semester').val(),
                            }).then(function(result){
                                kriteriaComponent(result)
                                $('#btn-add-kriteria').removeClass('btn-hide')
                            })
                            getNormalisasiKriteria({
                                "periode": $('#periode').val(),
                                "semester": $('#semester').val(),
                            }).then(function(result){
                                normalisasiKriteriaComponent(result)
                            })
                            $('#table-penilaian').hide()
                            $('#table-normalisasi-penilaian').hide()
                            $('#normalisasi-penilaian-loader').html(`<i class="fas fa-ban" style="font-size: 5rem; opacity: .5"></i>
                                                                    <h5 style="margin-top: 2.5rem; opacity: .75">Belum ada data yang dipilih</h5>`)
                            $('#normalisasi-penilaian-loader').show()

                            $('#table-hasil-penilaian').hide()
                            $('#hasil-chart').hide()
                            $('#hasil-loader').html(`<i class="fas fa-ban" style="font-size: 5rem; opacity: .5"></i>
                                                                    <h5 style="margin-top: 2.5rem; opacity: .75">Belum ada data yang dipilih</h5>`)
                            $('#hasil-loader').show()
                        }
                    }
                })
            }
        })

        $('#cancel-update-kriteria').on('click', function(){
            kriteriaRow.html(oldRowKriteria)
            buttonUpdateKriteria()
            buttonDeleteKriteria()
            buttonSelectKriteria()
            $('.update-kriteria').removeClass('btn-hide')   
            $('.delete-kriteria').removeClass('btn-hide')                          
            $('#btn-add-kriteria').removeClass('btn-hide')
        })
    })
}

function buttonDeleteKriteria() {
    $('.delete-kriteria').unbind('click')
    $('.delete-kriteria').on('click', function(){
        $('#delete-warning-message').html('Hapus kriteria ' + $(this).data('nama'))
        $('#delete_id_kriteria').val($(this).data('id'))
        $('#modalDeleteKriteria').modal('show')
    })

    $('#btn-delete-data').unbind('click')
    $('#btn-delete-data').on('click', function(){
        $.ajax({
            type: 'post',
            url: '/kriteria/delete',
            data:{
                "id": $('#delete_id_kriteria').val()
            },
            success:function(result){
                if (result.response == "success") {
                    getKriteria({
                        "periode": $('#periode').val(),
                        "semester": $('#semester').val(),
                    }).then(function(result){
                        $('#modalDeleteKriteria').modal('hide')
                        kriteriaComponent(result)
                    })
                    getNormalisasiKriteria({
                        "periode": $('#periode').val(),
                        "semester": $('#semester').val(),
                    }).then(function(result){
                        normalisasiKriteriaComponent(result)
                    })
                    $('#table-penilaian').hide()
                    $('#table-normalisasi-penilaian').hide()
                    $('#normalisasi-penilaian-loader').html(`<i class="fas fa-ban" style="font-size: 5rem; opacity: .5"></i>
                                                            <h5 style="margin-top: 2.5rem; opacity: .75">Belum ada data yang dipilih</h5>`)
                    $('#normalisasi-penilaian-loader').show()

                    $('#table-hasil-penilaian').hide()
                    $('#hasil-chart').hide()
                    $('#hasil-loader').html(`<i class="fas fa-ban" style="font-size: 5rem; opacity: .5"></i>
                                                            <h5 style="margin-top: 2.5rem; opacity: .75">Belum ada data yang dipilih</h5>`)
                    $('#hasil-loader').show()
                }
            }
        })
    })
}

function buttonAddKriteria() {
    $('#btn-add-kriteria').on('click', function(){
        $('#data-kriteria').append(`<tr id="row-add-kriteria">
                                        <td style="width: 50%"><input type="text" class="form-control" placeholder="Nama kriteria" id="add-kriteria-nama"></td>
                                        <td style="width: 20%"><input type="text" class="form-control" placeholder="Bobot" id="add-kriteria-bobot"></td>
                                        <td style="width: 30%; text-align: right">
                                            <button class="btn-table-action acc" id="add-kriteria"><i class="fas fa-check"></i></button> &nbsp;
                                            <button class="btn-table-action delete" id="cancel-add-kriteria"><i class="fas fa-times"></i></button>
                                        </td>
                                    </tr>`)
        $('#add-kriteria-nama').focus()
        $('.update-kriteria').addClass('btn-hide')   
        $('.delete-kriteria').addClass('btn-hide')                          
        $('#btn-add-kriteria').addClass('btn-hide')
    
        $('#cancel-add-kriteria').on('click', function(){
            $('#row-add-kriteria').remove()
            $('.update-kriteria').removeClass('btn-hide')   
            $('.delete-kriteria').removeClass('btn-hide')                          
            $('#btn-add-kriteria').removeClass('btn-hide')
        })
    
        $('#add-kriteria').unbind('click')
        $('#add-kriteria').on('click', function(){
            if ($('#add-kriteria-nama').val().length == 0) {
                alert('Masukkan nama kriteria !')
            }else if ($('#add-kriteria-bobot').val().length == 0){
                alert('Masukkan bobot')
            }else{
                $('#add-kriteria').attr('disabled', 'disabled')
                $('#cancel-add-kriteria').attr('disabled', 'disabled')
                $.ajax({
                    type: 'post',
                    url: '/kriteria/add',
                    data: {
                        "nama": $('#add-kriteria-nama').val(),
                        "bobot": $('#add-kriteria-bobot').val(),
                        "periode": $('#periode').val(),
                        "semester": $('#semester').val(),
                    },
                    success:function(result){
                        if (result.response == "success") {
                            getKriteria({
                                "periode": $('#periode').val(),
                                "semester": $('#semester').val(),
                            }).then(function(result){
                                kriteriaComponent(result)
                                $('#btn-add-kriteria').removeClass('btn-hide')
                            })
                            getNormalisasiKriteria({
                                "periode": $('#periode').val(),
                                "semester": $('#semester').val(),
                            }).then(function(result){
                                normalisasiKriteriaComponent(result)
                            })
                            $('#table-penilaian').hide()
                            $('#table-normalisasi-penilaian').hide()
                            $('#normalisasi-penilaian-loader').html(`<i class="fas fa-ban" style="font-size: 5rem; opacity: .5"></i>
                                                                    <h5 style="margin-top: 2.5rem; opacity: .75">Belum ada data yang dipilih</h5>`)
                            $('#normalisasi-penilaian-loader').show()
    
                            $('#table-hasil-penilaian').hide()
                            $('#hasil-chart').hide()
                            $('#hasil-loader').html(`<i class="fas fa-ban" style="font-size: 5rem; opacity: .5"></i>
                                                                    <h5 style="margin-top: 2.5rem; opacity: .75">Belum ada data yang dipilih</h5>`)
                            $('#hasil-loader').show()
                        }
                    }
                })
            }
        })
    })
}

// Kriteria Ternormalisasi
function getNormalisasiKriteria(params){
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'get',
            url: `/kriteria-normalisasi/get/${params.periode}/${params.semester}`,
            success:function(result){
                resolve(result)
            }
        })
    })
}

function normalisasiKriteriaComponent(result) {
    $('#panel-body-normalisasi-kriteria').html(`<table class="table">
                                                    <thead>
                                                        <tr>
                                                            <th>Kriteria</th>
                                                            <th>Bobot Ternormalisasi</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="data-kriteria-normalisasi">
                                                        
                                                    </tbody>
                                                </table>
                                                <button class="btn btn-info" style="visibility: hidden; display:none;"><i class="far fa-plus"></i></button>`)

    normalisasiKriteria = result
    $('#data-kriteria-normalisasi').empty()
    $.each(result, function(i, v){
        $('#data-kriteria-normalisasi').append(`<tr>
                                                    <td>${v.nama}</td>
                                                    <td>${v.bobot}</td>
                                                </tr>`)
    })
}

function buttonUpdateSubKriteria() {
    $('.update-sub-kriteria').unbind('click')
    $('.update-sub-kriteria').on('click', function(){
        let oldRowKriteria = $(this).parent().parent().html()
        let kriteriaRow = $(this).parent().parent()
        let kriteriaId = $(this).data('id')
        let kriteriaNama = $(this).data('nama')
        let kriteriaNilai = $(this).data('nilai')
        
        kriteriaRow.html(`<td style="width: 50%"><input type="text" class="form-control" placeholder="Nama kriteria" id="update-sub-kriteria-nama" value="${kriteriaNama}"></td>
                            <td style="width: 20%"><input type="text" class="form-control" placeholder="Nilai" id="update-sub-kriteria-nilai" value="${kriteriaNilai}"></td>
                            <td style="width: 30%; text-align: right">
                                <button class="btn-table-action acc" id="update-sub-kriteria"><i class="fas fa-check"></i></button> &nbsp;
                                <button class="btn-table-action delete" id="cancel-update-sub-kriteria"><i class="fas fa-times"></i></button>
                            </td>`)
        $('#update-sub-kriteria-nama').focus()
        $('.update-sub-kriteria').addClass('btn-hide')
        $('.delete-sub-kriteria').addClass('btn-hide')
        $('#btn-add-sub-kriteria').addClass('btn-hide')

        $('#update-sub-kriteria').unbind('click')
        $('#update-sub-kriteria').on('click', function(){
            if ($('#update-sub-kriteria-nama').val().length == 0) {
                alert('Masukkan nama kriteria')
            }else if($('#update-sub-kriteria-nilai').val().length == 0){
                alert('Masukkan nilai')
            }else{
                $('#update-sub-kriteria').attr('disabled', 'disabled')
                $('#cancel-update-sub-kriteria').attr('disabled', 'disabled')
                $.ajax({
                    type: 'post',
                    url: '/sub-kriteria/update',
                    data: {
                        "id": kriteriaId,
                        "nama": $('#update-sub-kriteria-nama').val(),
                        "nilai": $('#update-sub-kriteria-nilai').val()
                    },
                    success:function(result){
                        if (result.response == "success") {
                            // getKriteria().then(function(result){
                            //     kriteriaComponent(result)
                            // })
                            getSubKriteria(kriteriaActive)
                            $('#btn-add-sub-kriteria').removeClass('btn-hide')

                            $('#table-penilaian').hide()

                            $('#table-hasil-penilaian').hide()
                            $('#hasil-chart').hide()
                            $('#hasil-loader').html(`<i class="fas fa-ban" style="font-size: 5rem; opacity: .5"></i>
                                                                    <h5 style="margin-top: 2.5rem; opacity: .75">Belum ada data yang dipilih</h5>`)
                            $('#hasil-loader').show()
                        }
                    }
                })
            }
        })

        $('#cancel-update-sub-kriteria').on('click', function(){
            kriteriaRow.html(oldRowKriteria)
            buttonUpdateSubKriteria()
            buttonDeleteSubKriteria()
            $('.update-sub-kriteria').removeClass('btn-hide')   
            $('.delete-sub-kriteria').removeClass('btn-hide')                          
            $('#btn-add-sub-kriteria').removeClass('btn-hide')
        })
    })
}

function buttonDeleteSubKriteria() {
    $('.delete-sub-kriteria').unbind('click')
    $('.delete-sub-kriteria').on('click', function(){
        $('#delete-warning-sub-kriteria-message').html('Hapus kriteria ' + $(this).data('nama'))
        $('#delete_id_sub_kriteria').val($(this).data('id'))
        $('#modalDeleteSubKriteria').modal('show')
    })

    $('#btn-delete-sub-kriteria-data').unbind('click')
    $('#btn-delete-sub-kriteria-data').on('click', function(){
        $.ajax({
            type: 'post',
            url: '/sub-kriteria/delete',
            data:{
                "id": $('#delete_id_sub_kriteria').val()
            },
            success:function(result){
                if (result.response == "success") {
                    // getKriteria().then(function(result){
                    //     $('#modalDeleteSubKriteria').modal('hide')
                    //     kriteriaComponent(result)
                    // })
                    $('#modalDeleteSubKriteria').modal('hide')
                    getSubKriteria(kriteriaActive)
                    $('#table-penilaian').hide()

                    $('#table-hasil-penilaian').hide()
                    $('#hasil-chart').hide()
                    $('#hasil-loader').html(`<i class="fas fa-ban" style="font-size: 5rem; opacity: .5"></i>
                                                            <h5 style="margin-top: 2.5rem; opacity: .75">Belum ada data yang dipilih</h5>`)
                    $('#hasil-loader').show()
                }
            }
        })
    })
}

function buttonAddSubKriteria() {
    $('#btn-add-sub-kriteria').on('click', function(){
        $('#data-sub-kriteria').append(`<tr id="row-add-sub-kriteria">
                                        <td style="width: 50%"><input type="text" class="form-control" placeholder="Nama kriteria" id="add-sub-kriteria-nama"></td>
                                        <td style="width: 20%"><input type="text" class="form-control" placeholder="Nilai" id="add-sub-kriteria-nilai"></td>
                                        <td style="width: 30%; text-align: right">
                                            <button class="btn-table-action acc" id="add-sub-kriteria"><i class="fas fa-check"></i></button> &nbsp;
                                            <button class="btn-table-action delete" id="cancel-add-sub-kriteria"><i class="fas fa-times"></i></button>
                                        </td>
                                    </tr>`)
        $('#add-sub-kriteria-nama').focus()
        $('.update-sub-kriteria').addClass('btn-hide')   
        $('.delete-sub-kriteria').addClass('btn-hide')                          
        $('#btn-add-sub-kriteria').addClass('btn-hide')
    
        $('#cancel-add-sub-kriteria').on('click', function(){
            $('#row-add-sub-kriteria').remove()
            $('.update-sub-kriteria').removeClass('btn-hide')   
            $('.delete-sub-kriteria').removeClass('btn-hide')                          
            $('#btn-add-sub-kriteria').removeClass('btn-hide')
        })
    
        $('#add-sub-kriteria').unbind('click')
        $('#add-sub-kriteria').on('click', function(){
            if ($('#add-sub-kriteria-nama').val().length == 0) {
                alert('Masukkan nama kriteria !')
            }else if ($('#add-sub-kriteria-nilai').val().length == 0){
                alert('Masukkan nilai')
            }else{
                $('#add-sub-kriteria').attr('disabled', 'disabled')
                $('#cancel-add-sub-kriteria').attr('disabled', 'disabled')
                $.ajax({
                    type: 'post',
                    url: '/sub-kriteria/add',
                    data: {
                        "id_kriteria": kriteriaActive,
                        "nama": $('#add-sub-kriteria-nama').val(),
                        "nilai": $('#add-sub-kriteria-nilai').val()
                    },
                    success:function(result){
                        if (result.response == "success") {
                            // getKriteria().then(function(result){
                            //     kriteriaComponent(result)
                            //     $('#btn-add-sub-kriteria').removeClass('btn-hide')
                            // })
                            getSubKriteria(kriteriaActive)
                            $('#btn-add-sub-kriteria').removeClass('btn-hide')
                            $('#table-penilaian').hide()
    
                            $('#table-hasil-penilaian').hide()
                            $('#hasil-chart').hide()
                            $('#hasil-loader').html(`<i class="fas fa-ban" style="font-size: 5rem; opacity: .5"></i>
                                                                    <h5 style="margin-top: 2.5rem; opacity: .75">Belum ada data yang dipilih</h5>`)
                            $('#hasil-loader').show()
                        }
                    }
                })
            }
        })
    })
}