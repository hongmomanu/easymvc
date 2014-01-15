define(function () {

    function render(lookupname,folder,ajaxloading,res) {

        require(['views/dbgl/dbglbusinessalterform'],function(dbglbusinessalterform){
            dbglbusinessalterform.render(lookupname,folder,ajaxloading,res);


        });

    }
    return {
        render: render
    };
});