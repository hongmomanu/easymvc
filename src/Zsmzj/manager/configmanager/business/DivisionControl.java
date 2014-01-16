package Zsmzj.manager.configmanager.business;

import Zsmzj.manager.configmanager.impl.DivisionImplement;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-26
 * Time: 下午4:13
 * To change this template use File | Settings | File Templates.
 */
public class DivisionControl {
    public String addNewDivision(String divisionname,String divisionpath,int parentid,String signaturepath){

        DivisionImplement di=new DivisionImplement();
        int returnid=di.addDivision(divisionname,divisionpath,parentid,signaturepath);
        Map<String,Object> res=new HashMap<String, Object>();
        if(returnid>=0)res.put("success",true);
        else res.put("success",false);
        return JSONObject.fromObject(res).toString();

    }
    public String editDivision(int divisionid,String divisionname,String signaturepath){
        DivisionImplement di=new DivisionImplement();
        int returnid=di.editlDivision(divisionid,divisionname,signaturepath);
        Map<String,Object> res=new HashMap<String, Object>();
        if(returnid>=0)res.put("success",true);
        else res.put("success",false);
        return JSONObject.fromObject(res).toString();

    }
    public String delDivision(int divisionid){
        DivisionImplement di=new DivisionImplement();
        int returnid=di.delDivision(divisionid);
        Map<String,Object> res=new HashMap<String, Object>();
        if(returnid>=0)res.put("success",true);
        else res.put("success",false);
        return JSONObject.fromObject(res).toString();


    }
    public String getDivisions(int parentid,boolean onlychildren){
        Map<String,Object> res=new HashMap<String, Object>();

        DivisionImplement di=new DivisionImplement();
        if(onlychildren){
            return JSONArray.fromObject(di.getDivisions(parentid)).toString();
        }
        res.put("text","");
        res.put("children",di.getDivisions(parentid));
        return JSONObject.fromObject(res).toString();

    }
}
