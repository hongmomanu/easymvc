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
public interface RoleMethods {
    ArrayList<Map<String, Object>> getRoles(int start, int limit, String keyword);
    ArrayList<Map<String, Object>> getRoleFuncs(int start, int limit, String keyword, int roleid);
    int delRoleFuncs(int roleid, int funcid);
    int addRoleFuncs(int roleid, int funcid);
    int addnewRole(String rolename);
    int delRole(int roleid);

}
