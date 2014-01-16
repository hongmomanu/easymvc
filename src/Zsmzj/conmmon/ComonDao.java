package Zsmzj.conmmon;

import Zsmzj.jdbc.JdbcFactory;
import org.apache.log4j.Logger;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.CountDownLatch;

/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-9-3
 * Time: 上午11:49
 * To change this template use File | Settings | File Templates.
 */
public class ComonDao {
    private static final Logger log = Logger.getLogger(ComonDao.class);
    public int getTotalCountBySql(String sql){
        Connection testConn= JdbcFactory.getConn("sqlite");
        PreparedStatement pstmt = JdbcFactory.getPstmt(testConn, sql);
        ArrayList<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
        int result=0;
        try {
            ResultSet rs = pstmt.executeQuery();
            while (rs.next()) {
                result=rs.getInt(1);
            }
        }catch (Exception e){
            log.debug(e.getMessage());
        }finally {
            return result;
        }



    }
    public ArrayList<Map<String,Object>> getTableList(String sql){
        Connection testConn= JdbcFactory.getConn("sqlite");
        PreparedStatement pstmt = JdbcFactory.getPstmt(testConn, sql);
        ArrayList<Map<String,Object>> list=new ArrayList<Map<String, Object>>();
        try {
            ResultSet rs = pstmt.executeQuery();
            ResultSetMetaData data=rs.getMetaData();
            int colnums=data.getColumnCount();
            while (rs.next()) {
                Map<String,Object> map=new HashMap<String, Object>();
                for(int i = 1;i<= colnums;i++){
                    String columnName = data.getColumnName(i);
                    String value=rs.getString(columnName);
                    map.put(columnName,value);
                }
                list.add(map);
            }
        }catch (Exception E){
            log.debug(E.getMessage());
        }
        finally {
            return list;
        }



    }

    public int getTotalCount(String tablename){
        Connection testConn= JdbcFactory.getConn("sqlite");
        String sql=  "select count(*) from "+tablename;
        PreparedStatement pstmt = JdbcFactory.getPstmt(testConn, sql);
        ArrayList<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
        int result=0;
        try {
            ResultSet rs = pstmt.executeQuery();
            while (rs.next()) {
                 result=rs.getInt(1);
            }
        }catch (Exception e){
            log.debug(e.getMessage());
        }finally {
            return result;
        }


    }
    public int delbysql(String sql){
        Connection testConn= JdbcFactory.getConn("sqlite");
        PreparedStatement pstmt = JdbcFactory.getPstmt(testConn, sql);
        int result=0;
        try {
            return pstmt.executeUpdate();
        }catch (Exception e){
            log.debug(e.getMessage());
        }finally {
            return result;
        }


    }
    public String getSingleCol(String sql){
        Connection testConn= JdbcFactory.getConn("sqlite");
        PreparedStatement pstmt = JdbcFactory.getPstmt(testConn, sql);
        String result="";
        try {
            ResultSet rs = pstmt.executeQuery();
            while (rs.next()) {
                result=rs.getString(1);
            }
        }catch (Exception e){
            log.debug(e.getMessage());
        }finally {
            return result;
        }

    }
    public Map<String,Object> getSigleObj (String sql){
        Connection testConn= JdbcFactory.getConn("sqlite");
        PreparedStatement pstmt = JdbcFactory.getPstmt(testConn, sql);
        Map<String,Object> map=new HashMap<String, Object>();
        try {
            ResultSet rs = pstmt.executeQuery();
            ResultSetMetaData data=rs.getMetaData();
            int colnums=data.getColumnCount();
            while (rs.next()) {

                for(int i = 1;i<= colnums;i++){
                    String columnName = data.getColumnName(i);
                    String value=rs.getString(columnName);
                    map.put(columnName,value);
                }
            }
        }catch (Exception E){
            log.debug(E.getMessage());
        }
        finally {
            return map;
        }

    }

    public static void main(String[] args){
        ComonDao cd=new ComonDao();
        int i=cd.getTotalCountBySql("select count(*) from users");
        System.out.println(i);
    }
}
