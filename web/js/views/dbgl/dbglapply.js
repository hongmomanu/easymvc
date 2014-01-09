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

        $('.affixfile').click(function(){
            //console.log(this);

            $('#affixwin').window('open');
            $('#affixwin').window('window').clickitem=this;
            var data=$('#affixwin').window('window').clickitem.formdata?
                $('#affixwin').window('window').clickitem.formdata:[];
            $('#affixfilegrid').datagrid('loadData',data);
        });

        $('.moneybasic').blur(function(){
            require(['views/dbgl/familygridfieldsbinds'], function (familygridfieldsbinds) {
                familygridfieldsbinds.moneychange();
            });

        });

        //#owername,
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
        /*$('#divisiontree').combotree('loadData', [
            {
                id: 0,
                text: '舟山市',
                divisionpath: '舟山市',
                "state": "closed"
            }
        ]);*/





        $('#divisiontree').combotree({
            url:'ajax/gettreedivision.jsp?onlychild=true&node=-1',
            method: 'get',
            onLoadSuccess:function(){
                if(!this.firstloaded){
                    $('#divisiontree').combotree('setValue', divisionpath);
                    this.firstloaded=true;
                }
            },
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

        });

        $('#appformsubmitcancel').click(function(){
            $('#tabs').tabs('close',1);
        });

        $('#appformsubmit').click(function(){
            //$('#tabs').tabs('close',1);
            var type=$('#appformsubmit').attr('type');//获取type
            $.messager.progress();
            $('#mainform').form('submit', {
                url: 'ajax/sendapply.jsp',
                onSubmit: function(param){
                    var isValid = $(this).form('validate');
                    if (!isValid){

                        $.messager.progress('close');	// hide progress bar while the form is invalid
                    }else{

                            var affixfiles=[];
                            var affixitems=$('.affixfile');
                            for(var i=0;i<affixitems.length;i++){
                                if(affixitems[i].formdata&&affixitems[i].formdata.length>0){
                                    var formdata=affixitems[i].formdata;
                                    var affixfileitem={};
                                    affixfileitem[$(affixitems[i]).attr('type')]=formdata;
                                    affixfiles.push(affixfileitem);
                                }
                            }
                            affixfiles.push({"accountimgpath":[{'attachmentname':'照片',
                                'attachmentpath':$('#personimg').attr('src')}]});
                            param.businesstype=businessTableType.dbgl;
                            param.userid=userid;
                            param.familymembers=$.toJSON($('#familymembersgrid').datagrid('getRows'));
                            param.processstatustype=processstatustype.ok;
                            param.isprocess=true;
                            param.affixfiles=$.toJSON([]);//附件数据未获取

                    }
                    return isValid;
            },
            success: function(){
                $.messager.progress('close');	// hide progress bar while submit successfully
            }
        });

            //alert('提交开始');
        });


        $('#personimg').click(function () {
            $('#imgwin').window('open');
        });

        $('#imgwin_cancel').bind('click', function () {
            $('#imgwin').window('close');
        });
        $('#imgwin_submit').bind('click', function () {
            require(['jqueryplugin/jquery-form'],function(AjaxFormjs){
                var success=function(data, jqForm, options)
                {
                    $('#personimg').attr('src', data.filepath);
                    $('#imgwin').window('close');
                };
                var options = {
                    //beforeSubmit:  showRequest,  // pre-submit callback
                    dataType:"json",
                    success: success,  // post-submit callback
                    timeout:   3000
                };
                $('#personimg_form').ajaxForm(options).submit() ;

            });
        });
        $('#uploadaffixdialog').bind('change',function(){
            var filename= $(this).val().slice($(this).val().lastIndexOf("\\")+1);
            $('#uploadaffixname').val(filename);
        });
        $('#affixwin_confirm').bind('click',function(){

            $('#affixwin').window('window').clickitem.formdata=$('#affixfilegrid').datagrid('getRows');
            require(['commonfuncs/UpdateItemNum'],function(UpdateItemNum){
                UpdateItemNum.updateitemnum($($('#affixwin').window('window').clickitem),
                    $('#affixfilegrid').datagrid('getRows').length,"(",")");
                    $('#affixwin').window('close');
            });
        });
        $('#affixwin_submit').bind('click', function () {
            require(['jqueryplugin/jquery-form'],function(AjaxFormjs){
                var success=function(data, jqForm, options)
                {
                        $('#affixfilegrid').datagrid('appendRow',{
                            attachmentname: data.filename,
                            attachmentpath:data.filepath
                        });
                };
                var options = {
                    //beforeSubmit:  showRequest,  // pre-submit callback
                    dataType:"json",
                    success: success,  // post-submit callback
                    timeout:   3000
                };
                $('#affixwinimg_form').ajaxForm(options).submit() ;

            });
        });

        $('#affixwin_cancel').bind('click', function () {
            $('#affixwin').window('close');
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