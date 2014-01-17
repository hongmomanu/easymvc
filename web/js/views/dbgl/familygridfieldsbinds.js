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
                    var relationship=$('#familymembersgrid').datagrid('getEditor', {index:index,field:'relationship'});
                    if($(relationship.target).val()==='户主')$('#owerid').val($(ed.target).val());
                    if(sex_birth.birthday){
                        var birthday = $('#familymembersgrid').datagrid('getEditor', {index:index,field:'birthday'});
                        var sex=$('#familymembersgrid').datagrid('getEditor', {index:index,field:'sex'});
                        var age=$('#familymembersgrid').datagrid('getEditor', {index:index,field:'age'});
                       $(birthday.target).val(sex_birth.birthday);
                       $(sex.target).val(sex_birth.sex);
                       $(age.target).val((new Date()).getFullYear()-parseInt(sex_birth.birthday.split("-")[0]));
                    }
                })
            });
        },
        namebind:function(index){
            var ed = $('#familymembersgrid').datagrid('getEditor', {index:index,field:'name'});
            $(ed.target).bind('propertychange change input',function () {
                var relationship=$('#familymembersgrid').datagrid('getEditor', {index:index,field:'relationship'});
                if($(relationship.target).val()==='户主')$('#owername').val($(ed.target).val());
            });

        },
        isenjoyedbind:function(index){
            /*var ed = $('#familymembersgrid').datagrid('getEditor', {index:index,field:'isenjoyed'});
            var value=$(ed.target).combobox('getValue');
            $(ed.target).combobox({
                onChange:function(item){
                    require(['commonfuncs/FilterGridrow'],function(FilterGridrow){
                        var rows=$('#familymembersgrid').datagrid('getRows');
                        var isenjoyedrows=FilterGridrow.ByFields(rows,['isenjoyed'],[isenjoyedtype.yes]);
                        var disabledlevelrows=FilterGridrow.ByFields(rows,['disabledlevel'],disabledtype.heavy);
                        var enjoyPersons=$('#enjoyPersons');
                        var disabledpersons=$('#disabledpersons');
                        if(enjoyPersons.length>0)enjoyPersons.val(isenjoyedrows.length);
                        if(disabledpersons.length>0)disabledpersons.val(disabledlevelrows.length);
                    });
                }

            });

            $(ed.target).combobox('setValue',value);
*/
        },
        /*未使用的方法*/
        changevalue:function(index){
            var ed = $('#familymembersgrid').datagrid('getEditor', {index:index,field:'name'});
            $(ed.target).val($('#owername').val());
            var edp = $('#familymembersgrid').datagrid('getEditor', {index:index,field:'personid'});
            $(edp.target).val($('#owerid').val());
        },
        caculatehelpmoney:function(){
            if($('#averageincome').length>0){
                var num=parseInt($('#FamilyPersons').val());
                var familyincome= parseFloat($('#incomesum').val())+parseFloat($('#propertysum').val());
                $('#averageincome').val((familyincome/12/num).toFixed(1));
                $('#familyincome').val(familyincome);
                var poorstandard=$('#poorstandard');
                if(poorstandard.length>0){
                    var minpercent=0.4;
                    var helpmomey=parseInt(poorstandard.val())-$('#averageincome').val();
                    var disablednum=parseInt($('#disabledpersons').val());
                    var totalmoney=parseFloat(poorstandard.val())*disablednum;
                    if(helpmomey<minpercent*parseFloat(poorstandard.val())){
                        totalmoney+=(minpercent*parseFloat(poorstandard.val()))*(num-disablednum);
                    }else{
                        totalmoney+=helpmomey.toFixed(1)*(num-disablednum)
                    }
                    $('#totalhelpmoney').val(totalmoney.toFixed(1));


                }

            }
        },
        moneychange:function(cssname){
            var inputs=$(cssname);
            var sum=0;
            for(var i=0;i<inputs.length;i++){
                if(i<inputs.length-1)sum+=parseFloat($(inputs[i]).val());
                else $(inputs[i]).val(sum.toFixed(1));
            }




        }
    };

    return a;
});
