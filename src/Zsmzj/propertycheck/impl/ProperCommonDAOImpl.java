package Zsmzj.propertycheck.impl;

import Zsmzj.jdbc.JdbcFactory;
import Zsmzj.propertycheck.PropertyCommonDAO;
import org.apache.log4j.Logger;

import java.sql.*;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-7
 * Time: 下午6:11
 * To change this template use File | Settings | File Templates.
 */
public class ProperCommonDAOImpl implements PropertyCommonDAO{
    private Connection conn=null;
    private static final Logger log = Logger.getLogger( PropertyCheckDAOImpl.class);
    public  ProperCommonDAOImpl(Connection conn){
        this.conn=conn;
    }
    @Override
    public int insertTableVales(Map<String, Object> col_vals, String tablename) {
        List<String> list=this.getColumnData(tablename);
        int result=0;
        String col_str="";
        String val_str="";
        ArrayList<String> val_arr=new ArrayList<String>();
        Iterator iter = col_vals.keySet().iterator();
        while (iter.hasNext()) {
            String key = iter.next().toString();
            if(null!=list&&!list.contains(key)){
                continue;
            }
            String val = col_vals.get(key).toString();
            val_arr.add(val);
            val_str+="?,";
            col_str+=key+",";

        }
        col_str.length();
        col_str=col_str.substring(0,col_str.length()-1);
        val_str=val_str.substring(0,val_str.length()-1);

        String sql = "insert  into " + tablename +
                " ("+col_str+") values " +"("+val_str+")";
        log.debug(sql);
        PreparedStatement pstmt=null;
        try {
            pstmt = conn.prepareStatement(sql);
            int i=0;
            for( i=0;i<val_arr.size();i++){

                pstmt.setString(i+1, val_arr.get(i)==null?"":val_arr.get(i));

            }
            pstmt.executeUpdate();
            ResultSet keys = pstmt.getGeneratedKeys(); // equivalent to "SELECT last_insert_id();"
            if(keys.next()) {
                result=keys.getInt(1);
            }

        } catch (SQLException ex) {

            log.debug(ex.getMessage());
            result= -1;


        }finally {
            try {
                if(null!=pstmt){
                    pstmt.close();
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        return  result;
    }

    @Override
    public int updateTableValesSpecail(Map<String, Object> col_vals, String tablename, Map<String, String> colnames, String kandv) {
        List<String> list=this.getColumnData(tablename);
        Statement stmt=null;
        kandv=(null!=kandv&&!kandv.equals(""))?"and "+kandv:"";
        String whereStr=" where 1=1 "+kandv;
        String str="";
        int result=0;
        ArrayList<String> val_arr=new ArrayList<String>();
        Iterator iter = col_vals.keySet().iterator();
        while (iter.hasNext()) {
            String key = iter.next().toString();
            if(null!=list&&!list.contains(key)){
                continue;
            }
            String val = col_vals.get(key).toString();
            val_arr.add(val);
            str+=key+"=?,";
            if(null!=colnames&&colnames.containsKey("key")){
                whereStr+=" and "+key+"='"+colnames.get(key)+"'";
            }
        }
        str=str.substring(0,str.length()-1);
        String sql = "update " + tablename +" set "+str+whereStr;

        log.debug(sql);
        PreparedStatement pstmt=null;
        try {
            pstmt = conn.prepareStatement(sql);
            int i=0;
            for( i=0;i<val_arr.size();i++){

                pstmt.setString(i+1, val_arr.get(i)==null?"":val_arr.get(i));

            }

            result= pstmt.executeUpdate();
        } catch (SQLException ex) {
            log.debug(ex.getMessage());

        } finally {
            try {
                pstmt.close();
            } catch (SQLException e) {
                log.debug(e.getMessage());
            }
        }
        return result;
    }

    @Override
    public int updateTableVales(Map<String, Object> col_vals, String tablename, Map<String, String> colnames) {
        return this.updateTableValesSpecail(col_vals,tablename,colnames,"");
    }

    @Override
    public List<String> getColumnData(String tablename) {
        Statement stmt=null;
        List<String> list=new ArrayList<String>();
        try {
            stmt=conn.createStatement();
            ResultSetMetaData mtdt=stmt.executeQuery("select * from "+tablename+ " where 1=0").getMetaData();
            for(int i=1;i<=mtdt.getColumnCount();i++){
                //log.debug(mtdt.getColumnTypeName(i));
                //log.debug(mtdt.getColumnName(i)+"#"+mtdt.getColumnType(i)+"#"+mtdt.getColumnType(i));
                //log.debug("********************************************");
                list.add(mtdt.getColumnName(i));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            try {
                if(null!=stmt){
                    stmt.close();
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        log.debug(list.toString());
        log.debug(list.size());
        return list;
    }

    @Override
    public int deleteTableValues(String stmt) {
        int result=0;
        PreparedStatement pstmt=null;
        try {
            pstmt=conn.prepareStatement(stmt);
            result=pstmt.execute()?1:0;
        } catch (SQLException e) {
            e.printStackTrace();
            result=-1;
        } finally {
            try {
                pstmt.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        return result;
    }

    @Override
    public boolean isExist(String sql) {
        boolean flag=false;
        Statement pstmt=null;
        try {
            pstmt=conn.createStatement();
            ResultSet rs=pstmt.executeQuery(sql);
            if(rs.next()){
                flag=true;
            }
            rs.close();
        } catch (SQLException e) {
            e.printStackTrace();
            flag=false;
        } finally {
            try {
                pstmt.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        return flag;
    }

    @Override
    public void execute(String sql) {
        PreparedStatement pstmt=null;
        try {
            pstmt=conn.prepareStatement(sql);
            pstmt.execute();
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            try {
                pstmt.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }

    public static void main(String[] args){
        ProperCommonDAOImpl p=new ProperCommonDAOImpl(JdbcFactory.getConn("sqlite"));
        Map<String,Object> map=new HashMap<String, Object>();
        map.put("name","lisi");
        List list=p.getColumnData("fm01change");
        System.out.println(list.size());
    }
}
