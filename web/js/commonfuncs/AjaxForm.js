/**
 * Created by jack on 14-1-7.
 */
define(function(){

    var a={
       submitForm:function(submitype,record,callback){
           var url='';
           if(submitype==='new')url='ajax/sendapply.jsp';
           else if(submitype==='save')url='ajax/updateapply.jsp';
           else if(submitype==='savechange')url='ajax/changeapply.jsp';
           else if(submitype==='savelogout')url='ajax/logoutapply.jsp';
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
                       param.businessid=record.id;
                       param.signatures=$.toJSON(signatures);
                   }else if(submitype==='savechange'){
                       param.businessid=record.id;
                       param.processstatustype=processstatustype.change;
                   }else if(submitype==='savelogout'){
                       param.businessid=record.id;
                       param.processstatustype=processstatustype.logout;

                   }

                   param.familymembers=$.toJSON($('#familymembersgrid').datagrid('getRows'));
                   param.affixfiles=$.toJSON(affixfiles);//附件数据

               }
               return isValid;
           };
           var sucess=callback;
           this.ajaxform($('#mainform'),url,submit,sucess)


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
