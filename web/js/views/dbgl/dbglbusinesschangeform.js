define(function () {

    function render(lookupname,folder,ajaxloading,res) {

        require(['views/dbgl/dbglbusinessalterform'],function(dbglbusinessalterform){
            dbglbusinessalterform.render(lookupname,folder,ajaxloading,res);
            /*var btns=$('.aprovlfuncs_btns');
            for(var i=0;i<btns.length;i++){

                if($(btns[i]).text()==='保存变更'||$(btns[i]).text()==='返回'){
                    alert(i);
                    $(btns[i]).show();
                }else{
                    $(btns[i]).hide();
                }
            }*/

        });

    }
    return {
        render: render
    };
});