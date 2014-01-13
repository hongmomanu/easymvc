/**
 * Created by jack on 14-1-7.
 */
define(function(data){

    var a={
       submitForm:function(submitype,data,callback){
           var url='';
           if(submitype==='new')url='ajax/sendapply.jsp';
           else if(submitype==='save')url='ajax/updateapply.jsp';
           //var type=$('#appformsubmit').attr('type');//获取type
           //var isprocess=$('#appformsubmit').attr('isprocess');//获取type
           $.messager.progress();
           $('#mainform').form('submit', {
               url: url,
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
                       var signatures=[];
                       if(submitype==='new')param.businesstype=$('#appformsubmit').attr('type');
                       if(submitype==='new')param.userid=userid;
                       if(submitype==='save')param.businessid=data.form.id;
                       if(submitype==='save')param.signatures=$.toJSON(signatures);
                       param.familymembers=$.toJSON($('#familymembersgrid').datagrid('getRows'));
                       if(submitype==='new')param.processstatustype=processstatustype.ok;
                       if(submitype==='new')param.isprocess=$('#appformsubmit').attr('isprocess');
                       param.affixfiles=$.toJSON(affixfiles);//附件数据

                   }
                   return isValid;
               },
               success: function(){
                   $.messager.progress('close');	// hide progress bar while submit successfully
                   if(callback)callback();

               }
           });


       }


    };
    return a;
});
