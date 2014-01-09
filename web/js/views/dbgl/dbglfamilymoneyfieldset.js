define( function () {

    function render(parameters) {
        $('.moneybasic').blur(function(){
            require(['views/dbgl/familygridfieldsbinds'], function (familygridfieldsbinds) {
                familygridfieldsbinds.moneychange();
            });

        });
    }

    return {
        render: render
    };
});