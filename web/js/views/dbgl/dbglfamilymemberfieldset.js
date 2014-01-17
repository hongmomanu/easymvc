define(['commonfuncs/PersonidValidator'], function (PersonidValidator) {

    function render(parameters,res) {
        $.parser.parse($(parameters));

        if(res){
            $('#mainform').form('load',res.form);
            var params = {
                businessid:res.form.id
            };
            var successFunc = function(data){
                $('#familymembersgrid').datagrid('loadData',data);

            };

            $.ajax({
                type: "post",        //使用get方法访问后台
                dataType: "json",       //返回json格式的数据
                url: "ajax/getfamilymembersbybid.jsp",   //要访问的后台地址
                data: params,         //要发送的数据
                complete :function(){},      //AJAX请求完成时
                success: successFunc
            });


        }else{
            require(['commonfuncs/ShowBirthDay'], function (ShowBirthDay) {
                var sex_birth=ShowBirthDay.showBirthday($('#owerid').val());
                if(sex_birth.birthday){
                    $('#familymembersgrid').datagrid('appendRow',
                        {
                            name: $('#owername').val(),
                            relationship:'户主',
                            birthday:sex_birth.birthday,
                            personid: $('#owerid').val(),
                            sex:sex_birth.sex,
                            isenjoyed:'享受',
                            persontype:'归正人员',
                            jobstatus:'',
                            bodystatus:'健康',

                            age:(new Date()).getFullYear()-parseInt(sex_birth.birthday.split("-")[0]),
                            monthlyincome: 0

                        }
                    );

                }
            });

        }




        $('#owerid,#owername').bind('change propertychange input',function () {

            require(['commonfuncs/ShowBirthDay'], function (ShowBirthDay) {
                var sex_birth=ShowBirthDay.showBirthday($('#owerid').val());
                $('#familymembersgrid').datagrid('updateRow',{
                    index: 0,
                    row: {
                        name: $('#owername').val(),
                        birthday:sex_birth.birthday,
                        sex:sex_birth.sex,
                        age:(new Date()).getFullYear()-parseInt(sex_birth.birthday.split("-")[0]),
                        personid: $('#owerid').val()
                    }
                });

            });


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
                            familygridfieldsbinds.isenjoyedbind(index);
                        });
                        editIndex = index;
                    } else {
                        $('#familymembersgrid').datagrid('selectRow', editIndex);
                    }
                }

            }
        });

        $('#newfamilymemer_btn').bind('click', function () {
            $('#familymembersgrid').datagrid('appendRow', {name: '', relationship: '其它'});
            var editIndex = $('#familymembersgrid').datagrid('getRows').length - 1;
            $('#familymembersgrid').datagrid('selectRow', editIndex)
                .datagrid('beginEdit', editIndex);

            require(['views/dbgl/familygridfieldsbinds'], function (familygridfieldsbinds) {
                familygridfieldsbinds.personidbind(editIndex);
                familygridfieldsbinds.namebind(editIndex);
                familygridfieldsbinds.isenjoyedbind(editIndex);
            });

            $('#FamilyPersons').val($('#familymembersgrid').datagrid('getRows').length);
        });

        $('#delfamilymemer_btn').bind('click', function () {
            var editIndex = $('#familymembersgrid').datagrid('getRows').length - 1;
            $('#familymembersgrid').datagrid('deleteRow', editIndex);
            $('#FamilyPersons').val($('#familymembersgrid').datagrid('getRows').length);
        });
        $('#newfamilymemer_save').bind('click', function () {
            if (endEditing()){
                $('#familymembersgrid').datagrid('acceptChanges');
                var rows=$('#familymembersgrid').datagrid('getRows');
                $('#FamilyPersons').val(rows.length);
                require(['commonfuncs/FilterGridrow'],function(FilterGridrow){
                    var isenjoyedrows=FilterGridrow.ByFields(rows,['isenjoyed'],[isenjoyedtype.yes]);
                    var disabledlevelrows=FilterGridrow.ByFields(rows,['disabledlevel'],disabledtype.heavy);
                    var enjoyPersons=$('#enjoyPersons');
                    var disabledpersons=$('#disabledpersons');
                    if(enjoyPersons.length>0)enjoyPersons.val(isenjoyedrows.length);
                    if(disabledpersons.length>0)disabledpersons.val(disabledlevelrows.length);
                });
            }
        });
    }

    return {
        render: render
    };
});