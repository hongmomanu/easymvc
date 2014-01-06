/**
 * Created by jack on 13-12-31.
 */
define(function(){

    var a={

        render:function(parameters){
            var me=this;
            $('#dbglacc,#dbedgeacc').tree({
                //url:'tree_data.json'
                onClick: function (node){

                    var tree=$(this);
                    if(tree.tree('isLeaf', node.target)){
                        if(!$('#tabs').tabs('exists',1)||this.nodeid!=node.id){
                            parameters.LoadingMask.ajaxLoading();
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
                                parameters.LoadingMask.ajaxLoadEnd();
                                /**/
                                basicinfojs.render();

                            });
                            this.nodeid=node.id;
                        }

                    }

                },
                onBeforeExpand:function(node){
                    this.searchtype=node.text;

                },
                onLoadSuccess:function(node, data){

                },
                onBeforeLoad:function(node, param){
                    param.roleid=roleid;
                    //param.leaf=true;
                    if(this.searchtype){
                        param.leaf=true;
                    }else{
                        this.searchtype="";
                    }
                    param.type=$(this).attr('name')+this.searchtype;
                },
                url:'ajax/gettreefuncsbyrule.jsp'

            });
            me.tree=tree;

        }
    }

    return a;
});