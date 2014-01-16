package Zsmzj.manager.usermanager.business;

import Zsmzj.conmmon.ComonDao;
import Zsmzj.manager.usermanager.impl.FuncImplement;
import Zsmzj.manager.usermanager.impl.RoleImplement;
import Zsmzj.manager.usermanager.impl.UserImplement;
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
public class RoleControl {
    private  final String FuncTable="functions";
    public String getRoles(int start,int limit,String keyword){

        RoleImplement role=new RoleImplement();
        return JSONArray.fromObject(role.getRoles(start, limit, keyword)).toString();

    }
    public String makeRoleFuncs(int roleid,String[] funcid,String[] deleteids){
        RoleImplement role=new RoleImplement();
        for(String str_id:deleteids){
            int func_id=Integer.parseInt(str_id);
            role.delRoleFuncs(roleid,func_id);
        }

        for(String str_id:funcid){
            int func_id=Integer.parseInt(str_id);
            role.addRoleFuncs(roleid,func_id);
        }

        Map<String,Object> res=new HashMap<String, Object>();
        res.put("success",true);
        return JSONObject.fromObject(res).toString();

    }
    public String getRoleFuncs(int start,int limit,String keyword,int roleid,String type){
        FuncImplement func=new FuncImplement();
        ComonDao cd=new ComonDao();

        int totalnum= cd.getTotalCount(FuncTable);

        ArrayList<Map<String, Object>> funcs=func.getFuncs(start, limit, keyword);
        RoleImplement role=new RoleImplement();
        ArrayList<Map<String, Object>> role_funcs=role.getRoleFuncs(start, limit, keyword,roleid);
        ArrayList<Map<String, Object>> result=new ArrayList<Map<String, Object>>();
        if(type==null){
            for(Map<String, Object> func_item:funcs){
                for(Map<String,Object> rolefunc_item:role_funcs){
                    if(rolefunc_item.get("funcid").toString().equals(func_item.get("funcid").toString())){
                        //func_item.put("rolefuncid",rolefunc_item.get("rolefuncid"));
                        func_item.put("selected",true);
                    }

                }
                result.add(func_item);
            }

        }
        else{
            for(Map<String, Object> func_item:funcs){
                for(Map<String,Object> rolefunc_item:role_funcs){
                    if(rolefunc_item.get("funcid").toString().equals(func_item.get("funcid").toString())
                          && func_item.get("functype").toString().equals(type)
                            ){
                        //func_item.put("rolefuncid",rolefunc_item.get("rolefuncid"));
                        func_item.put("selected",true);
                        result.add(func_item);
                    }
                }
            }
        }

        Map<String,Object>res=new HashMap<String, Object>();
        res.put("totalCount",totalnum);
        res.put("results",result);
        return JSONObject.fromObject(res).toString();

    }
    public String addNewRole(String rolename){
        RoleImplement role=new RoleImplement();
        Map<String,Object> res=new HashMap<String, Object>();
        int roleid=role.addnewRole(rolename);
        if(roleid>=0)res.put("success",true);
        else res.put("success",false);
        return JSONObject.fromObject(res).toString();

    }

    public String delRole(int roleid){
        RoleImplement role=new RoleImplement();
        Map<String,Object> res=new HashMap<String, Object>();
        int resultid=role.delRole(roleid);
        System.out.println(resultid);
        if(resultid>=0)res.put("success",true);
        else res.put("success",false);
        return JSONObject.fromObject(res).toString();

    }




}
