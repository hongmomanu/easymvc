/**
 * Created by jack on 14-1-7.
 */
define(function(){

    var a={

        personidbind:function(index){
            var ed = $('#familymembersgrid').datagrid('getEditor', {index:index,field:'personid'});
            //$(ed.target).blur();
            $(ed.target).bind('propertychange change input',function () {
                require(['commonfuncs/ShowBirthDay'], function (ShowBirthDay) {
                    var sex_birth=ShowBirthDay.showBirthday($(ed.target).val());
                    $('#owerid').val($(ed.target).val());
                    if(sex_birth.birthday){
                        var birthday = $('#familymembersgrid').datagrid('getEditor', {index:index,field:'birthday'});
                        var sex=$('#familymembersgrid').datagrid('getEditor', {index:index,field:'sex'});
                       $(birthday.target).val(sex_birth.birthday);
                       $(sex.target).val(sex_birth.sex);
                    }
                })
            });
        },
        namebind:function(index){
            var ed = $('#familymembersgrid').datagrid('getEditor', {index:index,field:'name'});
            //$(ed.target).blur();
            $(ed.target).bind('propertychange change input',function () {
                $('#owername').val($(ed.target).val());
            });

        },
        changevalue:function(index){
            var ed = $('#familymembersgrid').datagrid('getEditor', {index:index,field:'name'});
            $(ed.target).val($('#owername').val());
            var edp = $('#familymembersgrid').datagrid('getEditor', {index:index,field:'personid'});
            $(edp.target).val($('#owerid').val());

        },
        moneychange:function(){
            var inputs=$('.moneybasic');
            var sum=0;
            for(var i=0;i<inputs.length;i++){
                if(i<inputs.length-1)sum+=parseFloat($(inputs[i]).val());
                else $(inputs[i]).val(sum);
            }


        }
    };

    return a;
});
