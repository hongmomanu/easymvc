/**
 * Created by jack on 13-12-31.
 */
define(['commonfuncs/PersonidValidator'], function (PersonidValidator) {

    function render(parameters) {
        $.extend($.fn.validatebox.defaults.rules, {
            personid: {
                validator: PersonidValidator.IdentityCodeValid,
                message: '身份证不合法,请确认身份证是否正确输入!'
            }
        });
        $('#owername,#owerid').blur(function () {

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
                        });


                        editIndex = index;
                    } else {
                        $('#familymembersgrid').datagrid('selectRow', editIndex);
                    }
                }

            }
        });
        $('#divisiontree').combotree('loadData', [
            {
                id: 0,
                text: '舟山市',
                divisionpath: '舟山市',
                "state": "closed"
            }
        ]);

        $('#divisiontree').combotree({
            //url:'ajax/gettreedivision.jsp',
            method: 'get',
            onBeforeExpand: function (node) {
                $('#divisiontree').combotree("tree").tree("options").url
                    = "ajax/gettreedivision.jsp?onlychild=true&node=" + node.id;
            },
            onHidePanel: function () {
                $('#divisiontree').combotree('setValue',
                    $('#divisiontree').combotree('tree').tree('getSelected').divisionpath);
            }
        });

        $('.lazy-combobox').combobox({
            onShowPanel: function () {
                var searchtype = $(this).attr('searchtype');
                var url = 'ajax/getenumbytype.jsp?type=' + searchtype;
                $(this).combobox('reload', url);
            }

        })


        $('#personimg').click(function () {
            $('#imgwin').window('open');
        });
        $('#imgwin_cancel').bind('click', function () {
            $('#imgwin').window('close');
        });
        $('#newfamilymemer_btn').bind('click', function () {
            $('#familymembersgrid').datagrid('appendRow', {status: 'P', owername: '', owership: '其它'});
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