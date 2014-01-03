/**
 * Created by jack on 13-12-31.
 */
define(['Views/MainView','Views/MainNavigation','Views/MainTree'], function(MainView,MainNavigation,MainTree){

    function start(){
        //MainView.render({users:users});
        MainView.render();
        MainNavigation.render();
        MainTree.render();
    }

    return {
        start:start
    };
});
