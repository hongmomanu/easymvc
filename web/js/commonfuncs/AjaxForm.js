/**
 * Created by jack on 14-1-7.
 */
define(function(){

    var a={
       submitForm:function(submitype,record,callback){
           var url='';
           if(submitype==='new')url='ajax/sendapply.jsp';
           else if(submitype==='save')url='ajax/updateapply.jsp';
           //var type=$('#appformsubmit').attr('type');//获取type
           //var isprocess=$('#appformsubmit').attr('isprocess');//获取type
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
                   if(submitype==='new')param.businesstype=$('#appformsubmit').attr('type');
                   if(submitype==='new')param.userid=userid;
                   if(submitype==='save')param.businessid=record.id;
                   if(submitype==='save')param.signatures=$.toJSON(signatures);
                   param.familymembers=$.toJSON($('#familymembersgrid').datagrid('getRows'));
                   if(submitype==='new')param.processstatustype=processstatustype.ok;
                   if(submitype==='new')param.isprocess=$('#appformsubmit').attr('isprocess');
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
       ajaxsend:function(method,type,url,params,success,complete){

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
               success: success
           });
       }


    };
    return a;
});
