package Zsmzj.manager.configmanager.business;

import Zsmzj.manager.configmanager.impl.EnumImplement;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-16
 * Time: 上午11:05
 * To change this template use File | Settings | File Templates.
 */
public class EnumControl {
    public String getEnums(int start,int limit,String keyword){

        EnumImplement myenum= new EnumImplement();
        return JSONArray.fromObject(myenum.getEnums(start, limit, keyword)).toString();

    }

    public String getEnumsBytype(String type){
        EnumImplement myenum= new EnumImplement();
        return JSONArray.fromObject(myenum.getEnumsByType(type)).toString();

    }

    public String addEnum(String label,String value,String type){
        EnumImplement myenum= new EnumImplement();
        Map<String,Object> res=new HashMap<String, Object>();
        int enumid=myenum.addEnum(label,value,type);
        if(enumid>=0)res.put("success",true);
        else res.put("success",false);
        return JSONObject.fromObject(res).toString();
    }
}
