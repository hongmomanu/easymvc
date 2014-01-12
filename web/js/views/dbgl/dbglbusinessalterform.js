define(function () {

    function render(lookupname,folder,ajaxloading,res) {

        require(['views/dbgl/dbglbusinessapplyform'],function(dbglbusinessapplyform){
            dbglbusinessapplyform.render(lookupname,folder,ajaxloading);
            if(res){
                $('#mainform').form('load',res.form);
                var affix=res.affixfile;
                for(var i=0;i<affix.length;i++){
                   if(affix[i].attachmenttype=="accountimgpath"){
                       $('#personimg').attr('src',affix[i].results[0].attachmentpath);
                       break;
                   }
                }

            }

        });

    }
    return {
        render: render
    };
});