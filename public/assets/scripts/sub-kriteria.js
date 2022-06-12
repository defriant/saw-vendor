getKriteria().then(function(result){
    kriteriaComponent(result)
})

function getKriteria() {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'get',
            url: '/sub-kriteria/get',
            success:function(result){
                resolve(result)
            }
        })
    })
}

function kriteriaComponent(result) {
    $('#panel-body-sub-kriteria').html(`<table class="table">
                                        <thead>
                                            <tr>
                                                <th>Kriteria</th>
                                                <th>Nilai</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody id="data-sub-kriteria">
                                            
                                        </tbody>
                                    </table>
                                    <button class="btn btn-info" id="btn-add-sub-kriteria"><i class="far fa-plus"></i> &nbsp; Tambah Kriteria</button>`)

    $('#data-sub-kriteria').empty()
    $('#thead-penilaian').empty()

    $('#thead-penilaian').append(`<th>Karyawan</th>`)
    $.each(result.data, function(i, v){
        $('#data-sub-kriteria').append(`<tr>
                                        <td style="width: 50%">${v.nama}</td>
                                        <td style="width: 20%">${v.nilai}</td>
                                        <td style="width: 30%; text-align: right">
                                            <button class="btn-table-action edit update-sub-kriteria" data-id="${v.id}" data-nama="${v.nama}" data-nilai="${v.nilai}"><i class="fas fa-pen"></i></button> &nbsp;
                                            <button class="btn-table-action delete delete-sub-kriteria" data-id="${v.id}" data-nama="${v.nama}"><i class="fas fa-trash-alt"></i></button>
                                        </td>
                                    </tr>`)
    })

    buttonAddKriteria()
    buttonUpdateKriteria()
    buttonDeleteKriteria()
}

function buttonUpdateKriteria() {
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
                            getKriteria().then(function(result){
                                kriteriaComponent(result)
                                $('#btn-add-sub-kriteria').removeClass('btn-hide')
                            })

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
            buttonUpdateKriteria()
            $('.update-sub-kriteria').removeClass('btn-hide')   
            $('.delete-sub-kriteria').removeClass('btn-hide')                          
            $('#btn-add-sub-kriteria').removeClass('btn-hide')
        })
    })
}

function buttonDeleteKriteria() {
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
                "id": $('#delete_id_kriteria').val()
            },
            success:function(result){
                if (result.response == "success") {
                    getKriteria().then(function(result){
                        $('#modalDeleteSubKriteria').modal('hide')
                        kriteriaComponent(result)
                    })
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

function buttonAddKriteria() {
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
                        "nama": $('#add-sub-kriteria-nama').val(),
                        "nilai": $('#add-sub-kriteria-nilai').val()
                    },
                    success:function(result){
                        if (result.response == "success") {
                            getKriteria().then(function(result){
                                kriteriaComponent(result)
                                $('#btn-add-sub-kriteria').removeClass('btn-hide')
                            })
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