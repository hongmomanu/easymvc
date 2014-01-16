package Zsmzj.propertycheck.impl;

import Zsmzj.propertycheck.FamilyMemberDAO;
import Zsmzj.propertycheck.PropertyCommonDAO;
import Zsmzj.propertycheck.ResultInfo;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.log4j.Logger;

import java.sql.*;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-7
 * Time: 下午5:58
 * To change this template use File | Settings | File Templates.
 */
public class FamilyMemberDAOImpl implements FamilyMemberDAO {
    private static final Logger log = Logger.getLogger( PropertyCheckDAOImpl.class);
    private SimpleDateFormat fmt=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
     private Connection conn=null;
     private PropertyCommonDAO commdao=null;
     public FamilyMemberDAOImpl(Connection conn, PropertyCommonDAO commdao){
            this.conn=conn;
            this.commdao=commdao;

     }
    public int saveFamilyMembers(Map<String,Object> params,int fmy001){
        int result_num=0;
        JSONArray arr=JSONArray.fromObject(params.get("familymembers"));
        for(Object item:arr){
            JSONObject jsonitem=JSONObject.fromObject(item);
            jsonitem.put("businessid",fmy001);
            jsonitem.put("time",fmt.format(new   java.util.Date()));
            result_num+=commdao.insertTableVales(this.json2Map(jsonitem), "fm02");

        }
        return result_num;
    }

    @Override
    public ResultInfo getfamilymembersbyfmy001(Map paraMap) {
        //int fmy001=Integer.parseInt((String)paraMap.get("fmy001"));
        String fmy001=(String)paraMap.get("fmy001");
        String sql=  "select * ,(strftime('%Y',date('now'))-strftime('%Y',birthday)) as age from fm02  where businessid = ?";
        log.debug(sql);
        log.debug(fmy001);
        PreparedStatement pstmt = null;
        ArrayList<Map<String,Object>> list=new ArrayList<Map<String, Object>>();

        try {
            pstmt=conn.prepareStatement(sql);
            pstmt.setString(1,fmy001);
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
            rs.close();
        }catch (Exception E){
            log.debug(E.getMessage());
        }
        finally {
            try {
                if(null!=pstmt)pstmt.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        return new ResultInfo(list.size(),list);
    }

    @Override
    public int doUpdate(Map<String, Object> param) {
        JSONArray arr=JSONArray.fromObject(param.get("familymembers"));
        int result_num=0;
        commdao.deleteTableValues("delete from fm02 where businessid='"+param.get("fmy001")+"'");
        for(Object item:arr){
            JSONObject jsonitem=JSONObject.fromObject(item);
            jsonitem.put("businessid",param.get("fmy001"));
            jsonitem.put("time",fmt.format(new java.util.Date()));
            commdao.insertTableVales(this.json2Map(jsonitem), "fm02");
            result_num++;
        }
        return result_num;
    }

    private Map<String,Object> json2Map(JSONObject jsonObj){
        Iterator<String> it=jsonObj.keys();
        Map<String,Object> map=new HashMap<String,Object>();
        while(it.hasNext()){
            String name=it.next();
            map.put(name,jsonObj.get(name));
        }
        log.debug(map.toString());
        return map;
    }
}
