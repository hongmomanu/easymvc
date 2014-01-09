define(['commonfuncs/PersonidValidator'], function (PersonidValidator) {

    function render(parameters) {
        $.parser.parse($(parameters));

        $('#owerid').blur(function () {
            if ($('#familymembersgrid').datagrid('getRows').length == 0) {
                require(['jqueryplugin/jquery-scrollto'], function (jqueryscroll) {
                    $('#formcontentpanel').scrollTo($('#familymembersdiv'));
                    $('#familymembersgrid').datagrid('appendRow',
                        {
                            name: $('#owername').val(),
                            relationship:'户主',
                            personid: $('#owerid').val(),
                            isenjoyed:'享受',
                            persontype:'归正人员',
                            jobstatus:'',
                            bodystatus:'健康',
                            sex: '男',
                            birthday: '',
                            age:0,
                            monthlyincome: 0

                        }
                    );
                    var editIndex = $('#familymembersgrid').datagrid('getRows').length - 1;
                    $('#familymembersgrid').datagrid('selectRow', editIndex)
                        .datagrid('beginEdit', editIndex);

                    require(['views/dbgl/familygridfieldsbinds'], function (familygridfieldsbinds) {
                        familygridfieldsbinds.personidbind(editIndex);
                        familygridfieldsbinds.namebind(editIndex);
                    });
                });
            } else {
                $('#familymembersgrid').datagrid('updateRow',{
                    index: 0,
                    row: {
                        name: $('#owername').val(),
                        personid: $('#owerid').val()
                    }
                });
            }

        });

        var editIndex = undefined;
        function endEditing(){
            if (editIndex == undefined){return true}
            if ($('#familymembersgrid').datagrid('validateRow', editIndex)){

                $('#familymembersgrid').datagrid('endEdit', editIndex);
                editIndex = undefined;
                return true;
            } else {
                return false;
            }
        }

        $('#familymembersgrid').datagrid({
            width: $('#familymembersdiv').width()-15,
            onClickRow:function(index, rowData){
                if (editIndex != index){
                    if (endEditing()){
                        $('#familymembersgrid').datagrid('selectRow', index)
                            .datagrid('beginEdit', index);
                        require(['views/dbgl/familygridfieldsbinds'], function (familygridfieldsbinds) {
                            familygridfieldsbinds.personidbind(index);
                            familygridfieldsbinds.namebind(index);
                        });
                        editIndex = index;
                    } else {
                        $('#familymembersgrid').datagrid('selectRow', editIndex);
                    }
                }

            }
        });

        $('#newfamilymemer_btn').bind('click', function () {
            $('#familymembersgrid').datagrid('appendRow', {name: 'jack', relationship: '其它'});
            var editIndex = $('#familymembersgrid').datagrid('getRows').length - 1;
            $('#familymembersgrid').datagrid('selectRow', editIndex)
                .datagrid('beginEdit', editIndex);
        });

        $('#delfamilymemer_btn').bind('click', function () {
            var editIndex = $('#familymembersgrid').datagrid('getRows').length - 1;
            $('#familymembersgrid').datagrid('deleteRow', editIndex);
        });
        $('#newfamilymemer_save').bind('click', function () {
            if (endEditing()){
                $('#familymembersgrid').datagrid('acceptChanges');
            }
        });



    }

    return {
        render: render
    };
});