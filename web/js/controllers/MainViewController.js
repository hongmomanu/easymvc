/**
 * Created by jack on 13-12-31.
 */
define(['views/MainTree'], function(MainTree){

    function start(){
        //MainView.render({users:users});

        MainTree.itemclick=function(node){
            if(MainTree.tree.tree('isLeaf', node.target)){
                //console.log(node);
                if(!$('#tabs').tabs('exists',1)||this.nodeid!=node.id){
                    //if(this.nodeid)$('#tabs').tabs('close',1);
                    //alert(node.value);
                    ajaxLoading();
                    require(['text!'+node.value+'.htm',node.value], function(basicinfo,basicinfojs){
                        var options= {
                            title: node.text,
                            content: basicinfo,
                            closable: true
                        };
                        //ajaxLoading();
                        if($('#tabs').tabs('exists',1)){

                            $('#tabs').tabs('select', 1);
                            $('#tabs').tabs('close',1);
                            /*$('#tabs').tabs('update', {
                                tab: $('#tabs').tabs('getSelected'),
                                options:{
                                    title: node.text,
                                    content: basicinfo,
                                    closable: true
                                }
                            });*/
                           /* $('#tabs').tabs('add',options);*/
                        }/*else{
                            $('#tabs').tabs('add',options);
                        }*/
                        $('#tabs').tabs('add',options);
                        ajaxLoadEnd();
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
