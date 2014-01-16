package Zsmzj.manager.usermanager.business;

import Zsmzj.conmmon.ComonDao;
import Zsmzj.manager.usermanager.impl.FuncImplement;
import Zsmzj.manager.usermanager.impl.RoleImplement;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-9
 * Time: 上午10:54
 * To change this template use File | Settings | File Templates.
 */
public class FuncControl {
    private  final String FuncTable="functions";
    public String getFuncs(int start,int limit,String keyword){

        FuncImplement func=new FuncImplement();
        ComonDao cd=new ComonDao();
        String sqlCount="select count(*) from "+FuncTable;
        if(keyword!=null&&!keyword.equals("")){
            sqlCount+=" where funcname like '%"+keyword+"%' ";
            sqlCount+=" or functype like '%"+keyword+"%' ";
            sqlCount+=" or label like '%"+keyword+"%' ";
            sqlCount+=" or imgurl like '%"+keyword+"%' ";
        }
        int totalnum= cd.getTotalCountBySql(sqlCount);
        ArrayList<Map<String,Object>> list=func.getFuncs(start, limit, keyword);
        Map<String,Object>res=new HashMap<String, Object>();
        res.put("totalCount",totalnum);
        res.put("results",list);
        return JSONObject.fromObject(res).toString();

    }

    public String getAllFuncsByRole(int roleid,String type){
        FuncImplement func=new FuncImplement();
        ArrayList<Map<String, Object>> result=func.getAllFuncsByRole(roleid,type);
        return JSONArray.fromObject(result).toString();
    }
    public String getFuncsByRole(int roleid,String type,String leaf){

        FuncImplement func=new FuncImplement();
        ArrayList<Map<String, Object>> result=func.getFuncsByRole(roleid,type);
        if(leaf !=null){
            for(Map<String, Object> item:result){
                item.put("leaf",true);
                item.put("state","open");
            }
        }
        else{
            for(Map<String, Object> item:result){
                item.put("state","closed");
            }
        }

        return JSONArray.fromObject(result).toString();


    }

    public String EditFunc(int funcid,String funcname,String functype,String label,String imgurl,int sortnum)
    {

        FuncImplement func=new FuncImplement();
        Map<String,Object> res=new HashMap<String, Object>();
        int resultid=func.EditFunc(funcid,funcname,functype,label,imgurl,sortnum);
        if(resultid>=0)res.put("success",true);
        else res.put("success",false);
        return JSONObject.fromObject(res).toString();
    }

    public String addNewFunc(String funcname,String functype){
        FuncImplement func=new FuncImplement();
        Map<String,Object> res=new HashMap<String, Object>();
        int funcid=func.addnewFunc(funcname,functype);
        if(funcid>=0)res.put("success",true);
        else res.put("success",false);
        return JSONObject.fromObject(res).toString();

    }

    public String delFunc(int roleid){
        FuncImplement func=new FuncImplement();
        Map<String,Object> res=new HashMap<String, Object>();
        int resultid=func.delFunc(roleid);
        if(resultid>=0)res.put("success",true);
        else res.put("success",false);
        return JSONObject.fromObject(res).toString();

    }



}
