/**
 * Created by jack on 13-12-31.
 */
define(['views/MainTree'], function(MainTree){

    function start(){
        //MainView.render({users:users});

        MainTree.itemclick=function(node){
            if(MainTree.tree.tree('isLeaf', node.target)){
                if(this.nodeid!=node.id){
                    //if(this.nodeid)$('#tabs').tabs('close',1);
                    require(['text!views/dbgl/BasicINfo.htm'], function(basicinfo){
                        var options= {
                            title: node.text,
                            content: basicinfo,
                            closable: true
                        };
                        if($('#tabs').tabs('exists',1)){

                            $('#tabs').tabs('select', 1);
                            $('#tabs').tabs('update', {
                                tab: $('#tabs').tabs('getSelected'),
                                options:{
                                    title: node.text,
                                    content: basicinfo,
                                    closable: true
                                }
                            });
                        }else{
                            $('#tabs').tabs('add',options);
                        }

                        /**/


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
