/**
 * Created by jack on 14-1-6.
 */

define(function(){

    var a={
        render:function(item,record){
            this.record=record;
            var processswindiv=$('#processwin');
            if(processswindiv.length>0){
                processswindiv.window('open');
            }
            else{
                var me=this;
                require(['text!views/dbgl/dbglprocesswin.htm','text!views/dbgl/dbglapplyhistoryfieldset.htm'],
                    function(div,table){
                    $('body').append(div);
                    $('#processwin').prepend($(table).find('div .siglecontent').html());

                    $('#processwin').window({
                        title: '流程状态',
                        width: 650,
                        height: 370,
                        closed: false,
                        cache: false,
                        onOpen:function(){
                            $.parser.parse($('#processwin').parent());
                            var grid=$('#processwin').find('.easyui-datagrid');
                            var options = grid.datagrid('options');
                            //console.log(options);
                            grid.datagrid(
                                {
                                    onBeforeLoad: function (params) {
                                        params.businessid =me.record.id;
                                        params.start = (options.pageNumber - 1) * options.pageSize;
                                        params.limit = options.pageSize;
                                        params.totalname = "total";
                                        params.rowsname = "rows";
                                    }
                                });
                        },
                        modal: true
                    });


                });
            }
        }

    }

    return a;
});
