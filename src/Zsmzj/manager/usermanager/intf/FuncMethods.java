package Zsmzj.manager.usermanager.intf;

import java.util.ArrayList;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-9
 * Time: 上午11:01
 * To change this template use File | Settings | File Templates.
 */
public interface FuncMethods {

    ArrayList<Map<String, Object>> getFuncs(int start, int limit, String keyword); //获取功能接口
    ArrayList<Map<String, Object>> getFuncsByRole(int roleid, String type);
    ArrayList<Map<String, Object>> getAllFuncsByRole(int roleid, String type);
    int addnewFunc(String funcname, String functype); //新增功能接口
    int delFunc(int funcid); //删除功能接口
    int EditFunc(int funcid, String funcname, String functype, String label, String imgurl, int sortnum);//编辑功能函数接口

}
