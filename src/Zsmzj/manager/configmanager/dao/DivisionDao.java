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
 * Date: 13-8-26
 * Time: 下午4:08
 * To change this template use File | Settings | File Templates.
 */
public class DivisionDao {

    private static final String DivisionTable="divisions";
    private static final Logger log = Logger.getLogger(DivisionDao.class);

    public ArrayList<Map<String, Object>>   getDivisions(int parentid){
        Connection testConn= JdbcFactory.getConn("sqlite");
        //String sql=  "select divisionname,divisionpath,rowid,signaturepath from "+DivisionTable+" where parentid=?";
        String sql=  "select a.divisionname,a.divisionpath,a.rowid,a.signaturepath,(select count(1) from divisions b where b.parentid=a.rowid) as leaf from "
                +DivisionTable+" a where a.parentid=?";

        PreparedStatement pstmt = JdbcFactory.getPstmt(testConn, sql);
        ArrayList<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
        try {
            pstmt.setInt(1,parentid);
            ResultSet rs = pstmt.executeQuery();
            while (rs.next()) {
                Map<String,Object> obj=new HashMap<String, Object>();
                obj.put("text",rs.getString("divisionname"));
                obj.put("divisionpath",rs.getString("divisionpath"));
                obj.put("id",rs.getInt("rowid"));
                obj.put("signaturepath",rs.getString("signaturepath"));
                obj.put("iconCls",Integer.parseInt(rs.getString("leaf"))>0?"":"division-tree-leaf");
                obj.put("leaf",Integer.parseInt(rs.getString("leaf"))>0?false:true);
                obj.put("state",Integer.parseInt(rs.getString("leaf"))>0?"closed":"open");

                if(rs.getString("signaturepath")==null||rs.getString("signaturepath").equals("")){
                    obj.put("qtip","无签章图片");
                }else{
                    obj.put("qtip","<img width=\"200\" height=\"200\" src=\""+ rs.getString("signaturepath")+"\">");
                }
                list.add(obj);

            }
            return list;
        }catch (Exception E){
            log.debug(E.getMessage());
            return list;
        }


    }
    public int editDivision(int divisionid,String divisionname, String signaturepath){
        Connection conn= JdbcFactory.getConn("sqlite");
        String sql = "update  " + DivisionTable +
                " set  divisionname=?,signaturepath=? where rowid=? ";

        PreparedStatement pstmt = JdbcFactory.getPstmt(conn, sql);
        try {
            pstmt.setString(1,divisionname);
            pstmt.setString(2,signaturepath);
            pstmt.setInt(3, divisionid);
            return pstmt.executeUpdate();
        } catch (SQLException ex) {
            log.debug(ex.getMessage());
            return -1;

        }


    }
    public int delDivision(int divisionid){
        Connection conn= JdbcFactory.getConn("sqlite");
        String sql = "delete  from " + DivisionTable +
                " where rowid=? ";

        PreparedStatement pstmt = JdbcFactory.getPstmt(conn, sql);
        try {
            pstmt.setInt(1, divisionid);
            return pstmt.executeUpdate();
        } catch (SQLException ex) {
            log.debug(ex.getMessage());
            return -1;

        }

    }
    public int addNewDivision(String divisionname,String divisionpath,int parentid,String signaturepath){
        Connection conn= JdbcFactory.getConn("sqlite");
        String sql = "insert  into " + DivisionTable +
                " (divisionname,divisionpath,parentid,signaturepath) values (?,?,?,?)  ";

        PreparedStatement pstmt = JdbcFactory.getPstmt(conn, sql);
        try {
            pstmt.setString(1, divisionname);
            pstmt.setString(2, divisionpath);
            pstmt.setInt(3, parentid);
            pstmt.setString(4, signaturepath);
            return pstmt.executeUpdate();
        } catch (SQLException ex) {
            log.debug(ex.getMessage());
            return -1;

        }


    }

}
