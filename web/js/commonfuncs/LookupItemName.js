/**
 * Created by jack on 14-1-7.
 */
define(function(){

    var a={

        lookupitemname:function(item,value){
            var result='';
            for(var i in item){
                if(item[i]==value){
                    result=i;
                    break;
                }
            }
            return result;
        }
    };

    return a;
});
