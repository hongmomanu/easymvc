package Zsmzj.manager.usermanager.dao;

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
public class RoleDao {
    private static final Logger log = Logger.getLogger(RoleDao.class);
    private  static String RoleTable="roles";
    private static String RoleFuncTable="functorole";
    private static String FuncTable="functions";
    public ArrayList<Map<String, Object>> getRoles(int start, int limit, String keyword) {
        Connection testConn= JdbcFactory.getConn("sqlite");
        String sql=  "select rolename,id from "+RoleTable+" Limit "+limit+" Offset "+ start;
        PreparedStatement pstmt = JdbcFactory.getPstmt(testConn, sql);
        ArrayList<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
        try {
            ResultSet rs = pstmt.executeQuery();
            while (rs.next()) {
                Map<String,Object> role=new HashMap<String, Object>();
                role.put("rolename",rs.getString("rolename"));
                role.put("roleid",rs.getInt("id"));
                list.add(role);

            }
            return list;
        }catch (Exception E){
            log.debug(E.getMessage());
            return list;
        }

    }

    public ArrayList<Map<String, Object>> getRoleFuncs(int start, int limit, String keyword,int roleid) {
        Connection testConn= JdbcFactory.getConn("sqlite");
        String sql=  "select funcid,roleid,id from "+RoleFuncTable+" where roleid=? ";//Limit "+limit+" Offset "+ start
        PreparedStatement pstmt = JdbcFactory.getPstmt(testConn, sql);
        ArrayList<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
        try {
            pstmt.setInt(1, roleid);
            ResultSet rs = pstmt.executeQuery();
            while (rs.next()) {
                Map<String,Object> role=new HashMap<String, Object>();
                role.put("funcid",rs.getInt("funcid"));

                role.put("roleid",rs.getInt("roleid"));
                role.put("rolefuncid",rs.getInt("id"));
                list.add(role);

            }
            return list;
        }catch (Exception E){
            log.debug(E.getMessage());
            return list;
        }

    }


    public int addNewRole(String rolename){
        Connection conn= JdbcFactory.getConn("sqlite");
        String sql = "insert  into " + RoleTable + " (rolename) values (?)  ";
        PreparedStatement pstmt = JdbcFactory.getPstmt(conn, sql);

        try {
            pstmt.setString(1, rolename);

            //pstmt.setInt(7, Integer.parseInt(params.get("keyid").toString()));
            return pstmt.executeUpdate();
        } catch (SQLException ex) {
            log.debug(ex.getMessage());
            return -1;

        }



    }

    public int addRoleFuncs(int roleid,int funcid){

        Connection conn= JdbcFactory.getConn("sqlite");
        String sql = "insert  into " + RoleFuncTable + " (roleid,funcid) values (?,?)  ";
        PreparedStatement pstmt = JdbcFactory.getPstmt(conn, sql);

        try {
            pstmt.setInt(1, roleid);
            pstmt.setInt(2, funcid);
            return pstmt.executeUpdate();
        } catch (SQLException ex) {
            log.debug(ex.getMessage());
            return -1;

        }



    }

    public int delRoleFuncs(int roleid,int deleteid){
        Connection conn= JdbcFactory.getConn("sqlite");
        String sql = "delete  from " + RoleFuncTable + " where roleid=? and funcid=? ";
        PreparedStatement pstmt = JdbcFactory.getPstmt(conn, sql);

        try {
            pstmt.setInt(1, roleid);
            pstmt.setInt(2, deleteid);
            return pstmt.executeUpdate();
        } catch (SQLException ex) {
            log.debug(ex.getMessage());
            return -1;

        }




    }
    public int delRole (int roleid){
        Connection conn= JdbcFactory.getConn("sqlite");
        String sql = "delete  from " + RoleTable + " where id=? ";
        PreparedStatement pstmt = JdbcFactory.getPstmt(conn, sql);

        try {
            pstmt.setInt(1, roleid);
            return pstmt.executeUpdate();
        } catch (SQLException ex) {
            log.debug(ex.getMessage());
            return -1;

        }



    }


}
