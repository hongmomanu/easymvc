/**
 * Created by jack on 13-12-31.
 */
define(['views/MainTree','commonfuncs/LoadingMask'], function(MainTree,LoadingMask){

    function start(){
        //MainView.render({users:users});

        MainTree.itemclick=function(node){
            if(MainTree.tree.tree('isLeaf', node.target)){
                if(!$('#tabs').tabs('exists',1)||this.nodeid!=node.id){

                    LoadingMask.ajaxLoading();
                    require(['text!'+node.value+'.htm',node.value], function(basicinfo,basicinfojs){
                        var options= {
                            title: node.text,
                            content: basicinfo,
                            closable: true
                        };
                        if($('#tabs').tabs('exists',1)){

                            $('#tabs').tabs('select', 1);
                            $('#tabs').tabs('close',1);

                        }
                        $('#tabs').tabs('add',options);
                        LoadingMask.ajaxLoadEnd();
                        /**/
                        basicinfojs.render();

                    });
                    this.nodeid=node.id;
                }




            }

        };
        MainTree.render();



    }

    return {
        start:start
    };
});
