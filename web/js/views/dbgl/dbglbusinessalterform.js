define(function () {

    function render(lookupname,folder,ajaxloading,res) {

        require(['views/dbgl/dbglbusinessapplyform'],function(dbglbusinessapplyform){
            dbglbusinessapplyform.render(lookupname,folder,ajaxloading,res);

            //$('#appformmore').bind("click",function(){alert(1);});

        });

    }
    return {
        render: render
    };
});