/**
 * Created by jack on 14-1-6.
 */

define(function(){

    var a={
        render:function(item,datares){
            var data=datares.record;
            var businessid=data['businessid'];
            var sucfun=function(res){
                res.record=data;
                var widgetname="";
                var folder='';
                if(data['processstatustype']==processstatustype.ok){
                    if(data['businesstype']==businessTableType.dbgl){
                        widgetname='dbglbusinessalterform';
                        folder='views/dbgl/';
                    }else if(data['businesstype']==businessTableType.dbbyh){
                        widgetname='dbedgebusinessalterform';
                    }
                    else if(data['businesstype']==businessTableType.temporaryhelp){
                        widgetname='temporaryhelpbusinessalterform';
                    }else if(data['businesstype']==businessTableType.charitablehelp){
                        widgetname='charitablehelpbusinessalterform';
                    }else if(data['businesstype']==businessTableType.medicalhelp){
                        widgetname='medicalhelpbusinessalterform';
                    }else if(data['businesstype']==businessTableType.studyhelp){
                        widgetname='studyhelpbusinessalterform';
                    }else if(data['businesstype']==businessTableType.disasterware){
                        widgetname='disasterhelpwarealterform';
                    }else if(data['businesstype']==businessTableType.disasterplace){
                        widgetname='disasterhelpbusinessalterform';
                    }else if(data['businesstype']==businessTableType.rangershelp){
                        widgetname='rangershelpbusinessalterform';
                    }else if(data['businesstype']==businessTableType.charitableinstitutionhelp){
                        widgetname='charitablehelpinstitutionalterform';
                    }else if(data['businesstype']==businessTableType.disasterhelp){
                        widgetname='disasterhelpcalamitybusinessalterform';
                    }

                }else if(data['processstatustype']==processstatustype.change){
                    if(data['businesstype']==businessTableType.dbgl){
                        folder='views/dbgl/';
                        widgetname='dbglbusinesschangeform';
                    }else if(data['businesstype']==businessTableType.dbbyh){
                        folder='views/dbedge/';
                        widgetname='dbedgebusinesschangeform';
                    }else if(data['businesstype']==businessTableType.disasterhelp){
                        widgetname='disasterhelpcalamitybusinesschangeform';
                    }

                }else if(data['processstatustype']==processstatustype.logout){
                    if(data['businesstype']==businessTableType.dbgl){
                        folder='views/dbgl/'
                        widgetname='dbglbusinesslogoutform';
                    }else if(data['businesstype']==businessTableType.dbbyh){
                        folder='views/dbedge/';
                        widgetname='dbedgebusinesslogoutform';
                    }else if(data['businesstype']==businessTableType.disasterhelp){
                        widgetname='disasterhelpcalamitybusinesslogoutform';
                    }
                }
                var title=data['owername'];
                var htmlfile='text!'+folder+widgetname+'.htm';
                var jsfile=folder+widgetname;

                require(['commonfuncs/TreeClickEvent'],function(TreeClickEvent){
                    var businesstype=$('#tabs').tabs('getSelected').panel('options').businesstype;
                    TreeClickEvent.ShowContent(htmlfile,jsfile,title,widgetname,
                        folder,res,null,businesstype);

                });
                //console.log(res);
            };
            require(['commonfuncs/GetFormData'],function(GetFormData){
                GetFormData.getValueBybusinessid(businessid,sucfun);
            });
        }

    }

    return a;
});
