let normalisasiPenilaian = []

function getKriteria(params) {
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

$('#periode-penilaian').datepicker({
    changeMonth: true,
    changeYear: true,
    showButtonPanel: true,
    dateFormat: 'yy-mm',
    onClose: function(dateText, inst) { 
        $(this).datepicker('setDate', new Date(inst.selectedYear, inst.selectedMonth, 1));
    }
})

$('#search-penilaian').on('click', function(){
    if ($('#periode-penilaian').val().length == 0) {
        alert('Masukkan periode penilaian')
    }else{
        $('#table-penilaian').hide()
        $('#penilaian-karyawan-loader').html(`<div class="loader4"></div>
                                            <h5 style="margin-top: 2.5rem">Mencari data penilaian</h5>`)
        $('#penilaian-karyawan-loader').show()
        getPenilaian($('#periode-penilaian').val())
    }
})

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
        $('#table-penilaian').hide()
        $('#penilaian-karyawan-loader').html(`<br>
                                            <div class="loader4"></div>
                                            <h5 style="margin-top: 2.5rem">Mencari data penilaian</h5>`)
        $('#penilaian-karyawan-loader').show()
        getPenilaian(params)
        getKriteria(params).then(function(result){
            $('#thead-penilaian').empty()
            $('#thead-normalisasi-penilaian').empty()
        
            $('#thead-penilaian').append(`<th>Karyawan</th>`)
            $('#thead-normalisasi-penilaian').append(`<th>Karyawan</th>`)
            $.each(result.data, function(i, v){
                $('#thead-penilaian').append(`<th>${v.nama}</th>`)
                $('#thead-normalisasi-penilaian').append(`<th>${v.nama}</th>`)
            })
            $('#thead-penilaian').append(`<th></th>`)
        })
    }
})

function getPenilaian(params) {
    $.ajax({
        type:'post',
        url:'/penilaian-karyawan/get',
        data:params,
        success:function(result){
            if (result.response == false) {
                $('#penilaian-karyawan-loader').html(`<br>
                                                        <i class="fas fa-ban" style="font-size: 5rem; opacity: .5"></i>
                                                        <h5 style="margin-top: 2.5rem; opacity: .75">Data penilaian periode ${result.periode} semester ${result.semester} tidak ditemukan !</h5>`)
                // $('#penilaian-karyawan-loader').html(`<h5 style="margin-top: 1rem">Data penilaian periode ${result.periode} semester ${result.semester} tidak ditemukan !</h5>
                //                                         <button class="btn btn-info" id="btn-buat-penilaian" style="margin-top: 1rem">Buat penilaian</button>`)
                $('#btn-buat-penilaian').unbind('click')
                $('#btn-buat-penilaian').on('click', function(){
                    createPenilaian(result.periode, result.semester)
                })

                $('#table-normalisasi-penilaian').hide()
                $('#normalisasi-penilaian-loader').html(`<i class="fas fa-ban" style="font-size: 5rem; opacity: .5"></i>
                                                        <h5 style="margin-top: 2.5rem; opacity: .75">Belum ada data yang dipilih</h5>`)
                $('#normalisasi-penilaian-loader').show()

                $('#table-hasil-penilaian').hide()
                $('#hasil-chart').hide()
                $('#hasil-loader').html(`<i class="fas fa-ban" style="font-size: 5rem; opacity: .5"></i>
                                                        <h5 style="margin-top: 2.5rem; opacity: .75">Belum ada data yang dipilih</h5>`)
                $('#hasil-loader').show()
            }else if (result.response == true) {
                console.log(result);
                $('#tbody-penilaian').empty()
                $.each(result.data, function(iRow, vRow){
                    $('#tbody-penilaian').append(`<tr id="row-penilaian-karyawan-${iRow}">
                                                        <td>${vRow.nama}</td>
                                                    </tr>`)

                    $.each(vRow.nilai, function(i, nilai){
                        let skNama = ''

                        $.each(result.subKriteria, function(i, sk){
                            if (sk.nilai == nilai.nilai && sk.id_kriteria == nilai.kriteria) {
                                skNama = sk.nama
                            }else if(nilai.nilai == 0){
                                skNama = '-'
                            }
                        })
                        
                        $(`#row-penilaian-karyawan-${iRow}`).append(`<td>${skNama}</td>`)
                    })

                    $(`#row-penilaian-karyawan-${iRow}`).append(`<td><button class="btn-table-action edit update-penilaian-karyawan" data-periode="${result.periode}" data-semester="${result.semester}" data-idkaryawan="${vRow.id_vendor}" data-namakaryawan="${vRow.nama}"><i class="fas fa-pen"></i></button></td>`)
                })

                $('#penilaian-karyawan-loader').empty()
                $('#penilaian-karyawan-loader').hide()
                getUpdatePenilaianKaryawan()
                $('#table-penilaian').show()

                getNormalisasiPenilaian(params)
            }
        }
    })
}

function createPenilaian(periode, semester) {
    $('#penilaian-karyawan-loader').html(`<div class="loader4"></div>
                                            <h5 style="margin-top: 2.5rem">Membuat penilaian periode ${periode} semester ${semester}</h5>`)
    
    $.ajax({
        type: 'post',
        url: '/penilaian-karyawan/create',
        data: {
            "periode": periode,
            "semester": semester
        },
        success:function(result){
            console.log(result);
            getPenilaian({
                "periode": periode,
                "semester": semester
            })
        }
    })
}

function getUpdatePenilaianKaryawan() {
    $('.update-penilaian-karyawan').unbind('click')
    $('.update-penilaian-karyawan').on('click', function(){
        $('#modalUpdatePenilaian .modal-content').html(`<div class="loader">
                                                            <div class="loader4"></div>
                                                            <h5 style="margin-top: 2.5rem">Loading data</h5>
                                                        </div>`)
        $('#modalUpdatePenilaian').modal('show')

        let periode = $(this).data('periode')
        let semester = $(this).data('semester')
        let idKaryawan = $(this).data('idkaryawan')
        let namaKaryawan = $(this).data('namakaryawan')

        $.ajax({
            type:'post',
            url:'/penilaian-karyawan/update/get',
            data:{
                "periode": periode,
                "semester": semester,
                "id_vendor": idKaryawan
            },
            success:function(result){
                if (result.response == "success") {
                    // let selectSubKriteria = `<option value="0"></option>`
                    // $.each(result.data.sub_kriteria, function(i,v){
                    //     selectSubKriteria = selectSubKriteria + `<option value="${v.nilai}">${v.nama}</option>`
                    // }) 

                    $('#modalUpdatePenilaian .modal-content').html(`<div class="modal-header">
                                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                                                            aria-hidden="true">&times;</span></button>
                                                                    <h4 class="modal-title" id="myModalLabel">Update Penilaian Karyawan</h4>
                                                                    </div>
                                                                    <div class="modal-body">
                                                                        <div class="row">
                                                                            <div class="col-sm-12 col-md-6" style="margin-bottom: 1.25rem">
                                                                                <p>ID Karyawan</p>
                                                                                <input type="text" id="penilaian_id_karyawan" class="form-control" disabled>
                                                                            </div>
                                                                            <div class="col-sm-12 col-md-6" style="margin-bottom: 1.25rem">
                                                                                <p>Nama Karyawan</p>
                                                                                <input type="text" id="penilaian_nama_karyawan" class="form-control" disabled>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="modal-header">
                                                                        <h4 class="modal-title" id="myModalLabel">Penilaian</h4>
                                                                    </div>
                                                                    <div class="modal-body">
                                                                        <div class="row" id="update-penilaian-kriteria">
                                                                            
                                                                        </div>
                                                                    </div>
                                                                    <div class="modal-footer">
                                                                        <button type="button" class="btn btn-primary" id="btn-update-penilaian">Simpan Penilaian</button>
                                                                    </div>`)

                    $('#penilaian_id_karyawan').val(idKaryawan)
                    $('#penilaian_nama_karyawan').val(namaKaryawan)

                    $.each(result.data, function(i, v){
                        let selectSubKriteria = `<option value="0"></option>`
                        $.each(v.sub_kriteria, function(i,v){
                            selectSubKriteria = selectSubKriteria + `<option value="${v.nilai}">${v.nama}</option>`
                        }) 

                        $('#update-penilaian-kriteria').append(`<div class="col-sm-12 col-md-6" style="margin-bottom: 1.25rem">
                                                                    <p>${v.kriteria}</p>
                                                                <!-- <input type="text" class="form-control data-kriteria" data-idkriteria="${v.id_kriteria}" value="${v.nilai}"> -->
                                                                    <select class="form-control data-kriteria" data-idkriteria="${v.id_kriteria}">
                                                                        ${selectSubKriteria}
                                                                    </select>
                                                                </div>`)

                                                                $(`.data-kriteria[data-idkriteria="${v.id_kriteria}"] option[value="${v.nilai}"]`).attr('selected', true)
                    })
                    $('#btn-update-penilaian').attr('data-periode', periode)
                    $('#btn-update-penilaian').attr('data-idkaryawan', idKaryawan)
                    $('#btn-update-penilaian').attr('data-semester', semester)
                    updatePenilaianKaryawan()
                }
            }
        })
    })
}

function updatePenilaianKaryawan() {
    $('#btn-update-penilaian').unbind('click')
    $('#btn-update-penilaian').on('click', function(){
        let valid = false
        $.each($('.data-kriteria'), function(i, v){
            if ($(this).val().length > 0) {
                valid = true
            }else{
                valid = false
                return false;
            }
        })

        if (valid == false) {
            alert('Lengkapi data penilaian !')
        }else{
            $('#btn-update-penilaian').attr('disabled', 'disabled')
            let periode = $('#btn-update-penilaian').attr('data-periode')
            let semester = $('#btn-update-penilaian').attr('data-semester')
            let id_karyawan = $('#btn-update-penilaian').attr('data-idkaryawan')
            let kriteria = []
            $.each($('.data-kriteria'), function(i, v){
                kriteria.push({
                    "id_kriteria": $(this).data('idkriteria'),
                    "nilai": $(this).val()
                })
            })
            
            $.ajax({
                type: 'post',
                url: '/penilaian-karyawan/update',
                data: {
                    "periode": periode,
                    "semester": semester,
                    "id_vendor" : id_karyawan,
                    "kriteria": kriteria
                },
                success:function(result){
                    if (result.response == "success") {
                        getPenilaian({
                            "periode": periode,
                            "semester": semester
                        })
                        getNormalisasiPenilaian({
                            "periode": periode,
                            "semester": semester
                        })
                        $('#modalUpdatePenilaian').modal('hide')
                    }
                }
            })
        }
    })
}

function getNormalisasiPenilaian(params) {
    $('#normalisasi-penilaian-loader').html(`<div class="loader4"></div>
                                            <h5 style="margin-top: 2.5rem">Membuat normalisasi penilaian</h5>`)
    $('#normalisasi-penilaian-loader').show()
    $('#table-normalisasi-penilaian').hide()
    $.ajax({
        type:'post',
        url:'/normalisasi-penilaian-karyawan/get',
        data:params,
        success:function(result){
            console.log(result);
            normalisasiPenilaian = result.data
            if (result.response == true) {
                $('#tbody-normalisasi-penilaian').empty()
                $.each(result.data, function(iRow, vRow){
                    $('#tbody-normalisasi-penilaian').append(`<tr id="row-normalisasi-penilaian-${iRow}">
                                                                    <td>${vRow.nama}</td>
                                                                </tr>`)

                    $.each(vRow.nilai, function(i, nilai){
                        $(`#row-normalisasi-penilaian-${iRow}`).append(`<td>${nilai.nilai}</td>`)
                    })
                })

                $('#normalisasi-penilaian-loader').empty()
                $('#normalisasi-penilaian-loader').hide()
                $('#table-normalisasi-penilaian').show()
            }
        }
    })
}