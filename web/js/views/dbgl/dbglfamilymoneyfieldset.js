define( function () {

    function render(parameters,res) {
        $('.moneybasic').blur(function(){

            require(['views/dbgl/familygridfieldsbinds'], function (familygridfieldsbinds) {
                familygridfieldsbinds.moneychange('.moneybasic');
            });

        });
        if(res){
            $(parameters).form('load',res.form);
        }
    }

    return {
        render: render
    };
});