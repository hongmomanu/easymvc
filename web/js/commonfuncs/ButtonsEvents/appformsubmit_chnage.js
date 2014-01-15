/**
 * Created by jack on 14-1-6.
 */

define(function(){

    var a={
        render:function(item,datares){
            //$('#tabs').tabs('close',1);
            var widgetname="";
            var businesstype=datares.record['businesstype'];
            if(businesstype==businessTableType.dbgl){
                widgetname='dbglbusinesschangeform';
                $.messager.alert('haha',"zhaodaole");
            }else if(businesstype==businessTableType.dbbyh){
                widgetname='dbedgebusinesschangeform';
            }else if(businesstype==businessTableType.disasterhelp){
                widgetname='disasterhelpcalamitybusinesschangeform';
            }else{
                $.messager.alert('警告','没有对应的模块!');
                return;
            }
        }

    }

    return a;
});
