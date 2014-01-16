package Zsmzj.manager.configmanager.dao;

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
 * Date: 13-8-16
 * Time: 上午11:10
 * To change this template use File | Settings | File Templates.
 */
public class EnumDao {
    private static String Enum_Table="enumerate";
    private static final Logger log = Logger.getLogger(EnumDao.class);
    public ArrayList<Map<String, Object>>  getEnums(int start, int limit, String keyword){
        Connection testConn= JdbcFactory.getConn("sqlite");
        String sql=  "select enumeratelabel,enumeratevalue,rowid,enumeratetype from "+
                Enum_Table+" Limit "+limit+" Offset "+ start;
        PreparedStatement pstmt = JdbcFactory.getPstmt(testConn, sql);
        ArrayList<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
        try {
            ResultSet rs = pstmt.executeQuery();
            while (rs.next()) {
                Map<String,Object> obj=new HashMap<String, Object>();
                obj.put("enumeratelabel",rs.getString("enumeratelabel"));
                obj.put("enumeratetype",rs.getString("enumeratetype"));
                obj.put("enumeratevalue",rs.getString("enumeratevalue"));
                obj.put("enumid",rs.getInt("rowid"));
                list.add(obj);

            }
            return list;
        }catch (Exception E){
            log.debug(E.getMessage());
            return list;
        }



    }
    public ArrayList<Map<String, Object>>  getEnumsByType(String type){
        Connection testConn= JdbcFactory.getConn("sqlite");
        String sql=  "select enumeratelabel,enumeratevalue  from "+
                Enum_Table+" where enumeratetype  MATCH ?";
        PreparedStatement pstmt = JdbcFactory.getPstmt(testConn, sql);
        ArrayList<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
        try {
            pstmt.setString(1,type);
            ResultSet rs = pstmt.executeQuery();
            while (rs.next()) {
                Map<String,Object> obj=new HashMap<String, Object>();
                obj.put("label",rs.getString("enumeratelabel"));
                obj.put("value",rs.getString("enumeratevalue"));
                list.add(obj);

            }
            return list;
        }catch (Exception E){
            log.debug(E.getMessage());
            return list;
        }



    }

    public int addNewEnum(String label,String value,String type){
        Connection conn= JdbcFactory.getConn("sqlite");
        String sql = "insert  into " + Enum_Table +
                " (enumeratelabel,enumeratevalue,enumeratetype) values (?,?,?)  ";
        PreparedStatement pstmt = JdbcFactory.getPstmt(conn, sql);
        try {
            pstmt.setString(1, label);
            pstmt.setString(2, value);
            pstmt.setString(3, type);
            return pstmt.executeUpdate();
        } catch (SQLException ex) {
            log.debug(ex.getMessage());
            return -1;

        }



    }

}
