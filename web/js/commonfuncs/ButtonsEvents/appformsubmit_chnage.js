/**
 * Created by jack on 14-1-6.
 */

define(function(){

    var a={
        render:function(item,datares){
            //$('#tabs').tabs('close',1);
            var widgetname="";
            var folder='';
            var businesstype=datares.record['businesstype'];
            var title=datares.record['owername'];
            if(businesstype==businessTableType.dbgl){
                widgetname='dbglbusinesschangeform';
                folder='views/dbgl/';


            }else if(businesstype==businessTableType.dbbyh){
                widgetname='dbedgebusinesschangeform';
                folder='views/dbedge/';
            }else if(businesstype==businessTableType.disasterhelp){
                widgetname='disasterhelpcalamitybusinesschangeform';
                folder='views/disaster/';
            }else{
                $.messager.alert('警告','没有对应的模块!');
                return;
            }
            var htmlfile='text!'+folder+widgetname+'.htm';
            var jsfile=folder+widgetname;
            require(['commonfuncs/TreeClickEvent'],function(TreeClickEvent){
                TreeClickEvent.ShowContent(htmlfile,jsfile,title,widgetname,
                    folder,datares);

            });
        }

    }

    return a;
});
