package Zsmzj.manager.usermanager.dao;

import Zsmzj.conmmon.ComonDao;
import Zsmzj.jdbc.JdbcFactory;
import org.apache.log4j.Logger;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-9
 * Time: 上午11:06
 * To change this template use File | Settings | File Templates.
 */
public class UserDao {
    private static final Logger log = Logger.getLogger(UserDao.class);
    private static String  UserTable="users";
    private static String DivisionTable="divisions";
    private static String  RoleTable="roles";
    public ArrayList<Map<String, Object>> getUsers(int start, int limit, String keyword) {
        Connection testConn= JdbcFactory.getConn("sqlite");
        String sql=  "select a.username,a.time,a.id,a.password,a.displayname,b.rolename from "+UserTable+" as a,"+RoleTable+" as b " +
                " where a.roleid=b.id Limit "+limit+" Offset "+ start;
        PreparedStatement pstmt = JdbcFactory.getPstmt(testConn, sql);
        ArrayList<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
        try {
            ResultSet rs = pstmt.executeQuery();
            while (rs.next()) {
                Map<String,Object> user=new HashMap<String, Object>();
                user.put("username",rs.getString("username"));
                user.put("rolename",rs.getString("rolename"));
                user.put("time",rs.getString("time"));
                user.put("userid",rs.getInt("id"));
                user.put("passwordold",rs.getString("password"));
                user.put("displayname",rs.getString("displayname"));
                list.add(user);

            }
            return list;
        }catch (Exception E){
            log.debug(E.getMessage());
            return list;
        }

    }

    public Map<String,Object> login(String username,String password){
        Connection testConn= JdbcFactory.getConn("sqlite");
        String sql=  "select a.id,a.roleid,a.displayname,b.divisionpath,b.rowid from "+UserTable+" a, " +DivisionTable+" b"+
                " where password=? and username=?  and a.divisionid=b.rowid";
        PreparedStatement pstmt = JdbcFactory.getPstmt(testConn, sql);
        Map<String,Object> res=new HashMap<String, Object>();
        try {
            pstmt.setString(1, password);
            pstmt.setString(2, username);
            ResultSet rs = pstmt.executeQuery();
            boolean issuccess=false;
            while (rs.next()) {
                issuccess=true;
                res.put("issuccess", true);

                res.put("msg", "用户验证成功");
                res.put("userid", rs.getInt(1));
                res.put("roleid", rs.getInt(2));
                res.put("displayname", rs.getString(3));
                res.put("divisionpath", rs.getString(4));
                res.put("divisionid", rs.getInt(5));


            }
            if(!issuccess){
                res.put("issuccess", false);
                res.put("msg", "用户名或者密码错误！");

            }
            res.put("username", username);

            return res;
        }catch (Exception E){
            log.debug(E.getMessage());
            res.put("issuccess", false);
            res.put("msg", E.getMessage());
            return res;
        }




    }
    public int addnewUser (String username,String password,int roleid,int divisionid,String displayname){

        Connection conn= JdbcFactory.getConn("sqlite");

        String sql_count="select count(*) from "+ UserTable+" where username='"+username+"'";
        ComonDao cd =new ComonDao();
        int count=cd.getTotalCountBySql(sql_count);
        if(count>0){
            return -1;
        }

        String sql = "insert  into " + UserTable + " (username,password,roleid,divisionid,displayname) " +
                "values (?,?,?,?,?)  ";
        PreparedStatement pstmt = JdbcFactory.getPstmt(conn, sql);

        try {
            pstmt.setString(1, username);
            pstmt.setString(2, password);
            pstmt.setInt(3, roleid);
            pstmt.setInt(4, divisionid);
            pstmt.setString(5,displayname);
            //pstmt.setInt(7, Integer.parseInt(params.get("keyid").toString()));
            return pstmt.executeUpdate();
        } catch (SQLException ex) {
            log.debug(ex.getMessage());
            return -1;

        }


    }
    public int editUser(int userid,String username,String displayname,String password,boolean iscomon,String oldpassword){
        Connection conn= JdbcFactory.getConn("sqlite");
        if(iscomon){
            String sql = "select count(*)  from " + UserTable + " where id="+userid+" and password='"+oldpassword+"'";
            ComonDao cd=new ComonDao();
            int num=cd.getTotalCountBySql(sql);
            if(num==0)return -1;
        }
        String sql = "update " + UserTable + " set username=?,displayname=?,password=? where id=? ";
        PreparedStatement pstmt = JdbcFactory.getPstmt(conn, sql);

        try {
            pstmt.setString(1,username);
            pstmt.setString(2,displayname);
            pstmt.setString(3,password);
            pstmt.setInt(4, userid);
            return pstmt.executeUpdate();
        } catch (SQLException ex) {
            log.debug(ex.getMessage());
            return -1;

        }

    }
    public int delUser(int userid){

        Connection conn= JdbcFactory.getConn("sqlite");
        String sql = "delete  from " + UserTable + " where id=? ";
        PreparedStatement pstmt = JdbcFactory.getPstmt(conn, sql);

        try {
            pstmt.setInt(1, userid);
            return pstmt.executeUpdate();
        } catch (SQLException ex) {
            log.debug(ex.getMessage());
            return -1;

        }
    }

}
