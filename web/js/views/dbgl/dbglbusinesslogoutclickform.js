define(function () {

    function render(lookupname,folder,ajaxloading,res) {

        require(['views/dbgl/dbglbusinessalterform'],function(dbglbusinessalterform){
            dbglbusinessalterform.render(lookupname,folder,ajaxloading,res);
            require(['commonfuncs/ButtonsEvent'],function(ButtonsEvent){
                var clickitem=$('#appformsubmit_saveapplylogout');
                clickitem.linkbutton({
                    disabled:true
                });
                clickitem.click(function(){
                    ButtonsEvent.approvl_btns(clickitem,res);
                });

            });

        });

    }
    return {
        render: render
    };
});