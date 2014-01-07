/**
 * Created by jack on 14-1-7.
 */
define(function(){

    var a={

        personidbind:function(index){
            var ed = $('#familymembersgrid').datagrid('getEditor', {index:index,field:'personid'});
            $(ed.target).bind('propertychange change input',function () {
                require(['commonfuncs/ShowBirthDay'], function (ShowBirthDay) {
                    var sex_birth=ShowBirthDay.showBirthday($(ed.target).val());
                    if(sex_birth.birthday){
                        var birthday = $('#familymembersgrid').datagrid('getEditor', {index:index,field:'birthday'});
                        var sex=$('#familymembersgrid').datagrid('getEditor', {index:index,field:'sex'});
                       $(birthday.target).val(sex_birth.birthday);
                       $(sex.target).val(sex_birth.sex);
                    }
                })
            });
        }
    };

    return a;
});
