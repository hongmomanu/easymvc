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
public interface UserMethods {
    ArrayList<Map<String, Object>> getUsers(int start, int limit, String keyword);//获取用户接口
    int addnewUser(String username, String password, int roleid, int divisionid, String displayname); //新增功能接口
    int delUser(int userid);
    int editUser(int userid, String username, String displayname, String password, boolean iscommon, String oldpassword);
    Map<String,Object> login(String username, String password);

}
