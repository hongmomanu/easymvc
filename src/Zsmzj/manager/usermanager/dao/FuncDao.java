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
public class FuncDao {
    private static final Logger log = Logger.getLogger(FuncDao.class);
    private  static String FuncTable="functions";
    private static String FuncToRoleTable="functorole";
    public ArrayList<Map<String, Object>> getFuncs(int start, int limit, String keyword) {
        Connection testConn= JdbcFactory.getConn("sqlite");
        String sql=  "select funcname,functype,id,label,imgurl,sortnum from "+FuncTable ;
        if(keyword!=null && !keyword.equals("")){
            sql+=" where funcname like '%"+keyword+"%' ";
            sql+=" or functype like '%"+keyword+"%' ";
            sql+=" or label like '%"+keyword+"%' ";
            sql+=" or imgurl like '%"+keyword+"%' ";

        }
        sql +=" Limit "+limit+" Offset "+ start;
        PreparedStatement pstmt = JdbcFactory.getPstmt(testConn, sql);
        ArrayList<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
        try {
            ResultSet rs = pstmt.executeQuery();
            while (rs.next()) {
                Map<String,Object> func=new HashMap<String, Object>();
                func.put("funcname",rs.getString("funcname"));
                func.put("functype",rs.getString("functype"));
                func.put("label",rs.getString("label"));
                func.put("imgurl",rs.getString("imgurl"));
                func.put("sortnum",rs.getInt("sortnum"));
                func.put("funcid",rs.getInt("id"));
                list.add(func);

            }
            return list;
        }catch (Exception E){
            log.debug(E.getMessage());
            return list;
        }

    }
    public ArrayList <Map<String, Object>> getAllFuncsByRole(int roleid,String type){
        Connection testConn= JdbcFactory.getConn("sqlite");

        String sql=  "select a.funcname,a.imgurl,a.label from "+FuncTable+" as a,"+
                FuncToRoleTable+" as b where a.id=b.funcid and b.roleid=? and a.functype=?" +
                " order by a.sortnum asc";
        PreparedStatement pstmt = JdbcFactory.getPstmt(testConn, sql);
        ArrayList<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
        try {
            pstmt.setInt(1,roleid);
            pstmt.setString(2,type);
            ResultSet rs = pstmt.executeQuery();
            while (rs.next()) {
                Map<String,Object> func=new HashMap<String, Object>();
                func.put("name",rs.getString("funcname"));
                func.put("children",getAllFuncsByRole(roleid,type+rs.getString("funcname")));
                func.put("value",rs.getString("label"));
                func.put("url",rs.getString("imgurl"));
                func.put("type","widget");
                list.add(func);

            }
            return list;
        }catch (Exception E){
            log.debug(E.getMessage());
            return list;
        }


    }
    public ArrayList<Map<String, Object>>   getFuncsByRole(int roleid,String type){

        Connection testConn= JdbcFactory.getConn("sqlite");

        String sql=  "select a.id,a.funcname,a.imgurl,a.label from "+FuncTable+" as a,"+
                FuncToRoleTable+" as b where a.id=b.funcid and b.roleid=? and a.functype=?" +
                " order by a.sortnum asc";
        PreparedStatement pstmt = JdbcFactory.getPstmt(testConn, sql);
        ArrayList<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
        try {
            pstmt.setInt(1,roleid);
            pstmt.setString(2,type);
            ResultSet rs = pstmt.executeQuery();
            while (rs.next()) {
                Map<String,Object> func=new HashMap<String, Object>();
                func.put("name",rs.getString("funcname"));
                func.put("id",rs.getString("id"));
                func.put("text",rs.getString("funcname"));
                func.put("value",rs.getString("label"));
                func.put("url",rs.getString("imgurl"));
                func.put("iconCls",rs.getString("imgurl"));
                func.put("type","widget");
                list.add(func);

            }
            return list;
        }catch (Exception E){
            log.debug(E.getMessage());
            return list;
        }


    }
    public int addNewFunc(String funcname,String functype){
        Connection conn= JdbcFactory.getConn("sqlite");
        String sql = "insert  into " + FuncTable + " (funcname,functype) values (?,?)  ";
        PreparedStatement pstmt = JdbcFactory.getPstmt(conn, sql);

        try {
            pstmt.setString(1, funcname);
            pstmt.setString(2, functype);

            //pstmt.setInt(7, Integer.parseInt(params.get("keyid").toString()));
            return pstmt.executeUpdate();
        } catch (SQLException ex) {
            log.debug(ex.getMessage());
            return -1;

        }



    }

    public int EditFunc(int funcid,String funcname,String functype,String label,String imgurl,int sortum)
    {
        Connection conn= JdbcFactory.getConn("sqlite");
        String sql = "update " + FuncTable + " set funcname=?,functype=?," +
                "label=?,imgurl=?,sortnum=? where id=? ";
        PreparedStatement pstmt = JdbcFactory.getPstmt(conn, sql);

        try {
            pstmt.setString(1, funcname);
            pstmt.setString(2, functype);
            pstmt.setString(3, label);
            pstmt.setString(4, imgurl);
            pstmt.setInt(5, sortum);
            pstmt.setInt(6, funcid);
            return pstmt.executeUpdate();
        } catch (SQLException ex) {
            log.debug(ex.getMessage());
            return -1;

        }

    }

    public int delFunc (int funcid){
        Connection conn= JdbcFactory.getConn("sqlite");
        String sql = "delete  from " + FuncTable + " where id=? ";
        PreparedStatement pstmt = JdbcFactory.getPstmt(conn, sql);

        try {
            pstmt.setInt(1, funcid);
            return pstmt.executeUpdate();
        } catch (SQLException ex) {
            log.debug(ex.getMessage());
            return -1;

        }



    }


}
