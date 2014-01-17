/**
 * Created by jack on 14-1-7.
 */
define(function(){

    var a={
       caculatefutrue:function(datares,FilterGridrow,params){
           if($('#familymembersgrid').length>0){
               rows=$('#familymembersgrid').datagrid('getRows');
               var form=datares.form;
               var incomesum=$('#incomesum').length>0?$('#incomesum').val():form['incomesum'];
               var propertysum=$('#propertysum').length>0?$('#propertysum').val():form['propertysum'];
               var familyincome=parseFloat(incomesum)+parseFloat(propertysum);
               var poorstandard=parseFloat($('#poorstandard').length>0?$('#poorstandard').val():form['poorstandard']);
               var incomesumareaperson=parseFloat(incomesum)/12/rows.length;

               var disablednum =FilterGridrow.ByFields(rows,['isenjoyed'],[isenjoyedtype.yes]).length;
               var totalmoney=poorstandard*disablednum;
               var averageincome=(familyincome/rows.length/12).toFixed(1);
               var minpercent=0.4;
               var helpmomey=poorstandard-averageincome;
               if(helpmomey<minpercent*poorstandard){
                   totalmoney+=(minpercent*poorstandard)*(rows.length-disablednum);
               }else{
                   totalmoney+=helpmomey.toFixed(1)*(rows.length-disablednum);
               }

               params.disabledpersons=disablednum;
               params.enjoyednum=FilterGridrow.ByFields(rows,['isenjoyed'],[isenjoyedtype.yes]).length;
               params.averageincome=averageincome;
               params.familyincome=familyincome;
               params.incomesumareaperson=incomesumareaperson.toFixed(1);
               params.totalhelpmoney=totalmoney;

               $('#mainform').form('load',{
                   disabledpersons:disablednum,
                   enjoyednum:FilterGridrow.ByFields(rows,['isenjoyed'],[isenjoyedtype.yes]).length,
                   averageincome:averageincome,
                   incomesumareaperson:incomesumareaperson.toFixed(1),
                   totalhelpmoney:totalmoney
               });



           }



       },
       submitForm:function(submitype,datares,callback){

           var me=this;
           var url='';
           if(submitype==='new')url='ajax/sendapply.jsp';
           else if(submitype==='save')url='ajax/updateapply.jsp';
           else if(submitype==='savechange')url='ajax/changeapply.jsp';
           else if(submitype==='savelogout')url='ajax/logoutapply.jsp';
           require(['commonfuncs/FilterGridrow'],function(FilterGridrow){
               var submit= function(param){
                   var isValid = $('#mainform').form('validate');
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
                       var signatures=[];
                       if(submitype==='new'){
                           var businesstype=$('#tabs').tabs('getSelected').panel('options').businesstype;
                           param.businesstype=businesstype;
                           param.userid=userid;
                           param.processstatustype=processstatustype.ok;
                           param.isprocess=$('#appformsubmit').attr('isprocess');
                       }else if(submitype==='save'){
                           param.businessid=datares.record.id;
                           param.signatures=$.toJSON(signatures);
                           me.caculatefutrue(datares,FilterGridrow,param);
                       }else if(submitype==='savechange'){
                           param.businessid=datares.record.id;
                           param.processstatustype=processstatustype.change;
                       }else if(submitype==='savelogout'){
                           param.businessid=datares.record.id;
                           param.processstatustype=processstatustype.logout;

                       }
                       if($('#familymembersgrid').length>0)param.familymembers=$.toJSON($('#familymembersgrid').datagrid('getRows'));
                       if($('.affixfile').length>0)param.affixfiles=$.toJSON(affixfiles);//附件数据

                   }
                   return isValid;
               };
               var sucess=callback;
               me.ajaxform($('#mainform'),url,submit,sucess)

           });




       },
       ajaxform:function(form,url,onsubmit,success){
           $.messager.progress();
           form.form('submit', {
                   url: url,
                   onSubmit:onsubmit,
                   success:function(res){
                       $.messager.progress('close');
                       if(success)success(res);
                   }

           });

       },
       ajaxsend:function(method,type,url,params,success,complete,errorfunc){

           $.messager.progress();
           var compfunc=function(){
               $.messager.progress('close');
               if(complete)complete();
           }
           $.ajax({
               type: method,
               dataType: type,
               url: url,
               data: params,
               complete :compfunc,
               error:errorfunc,
               success: success
           });
       }


    };
    return a;
});
