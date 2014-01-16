package Zsmzj.propertycheck.control;

import Zsmzj.enums.ProcessType;
import Zsmzj.jdbc.JdbcFactory;
import Zsmzj.jdbc.PostgreSql;
import Zsmzj.jdbc.SqliteSql;
import Zsmzj.propertycheck.FamilyMemberDAO;
import Zsmzj.propertycheck.PropertyCheckDAO;
import Zsmzj.propertycheck.PropertyCommonDAO;
import Zsmzj.propertycheck.ResultInfo;
import Zsmzj.propertycheck.impl.FamilyMemberDAOImpl;
import Zsmzj.propertycheck.impl.ProperCommonDAOImpl;
import Zsmzj.propertycheck.impl.PropertyCheckDAOImpl;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-11-19
 * Time: 下午8:15
 * To change this template use File | Settings | File Templates.
 */
public class ProperCheckControl {
	private PropertyCheckDAO checkdao=null;
    private PropertyCommonDAO commondao=null;
	private FamilyMemberDAO familymemberdao=null;
    private static Connection conn=null;
	public ProperCheckControl(){
        conn=ProperCheckControl.getConn("sqlite");
        commondao=new ProperCommonDAOImpl(conn);
        familymemberdao=new FamilyMemberDAOImpl(conn,commondao);
        checkdao=new PropertyCheckDAOImpl(conn,familymemberdao,commondao );

	}
    private void closeConnection(){

    }
    /*
    登记模块中保存家庭财产信息
     */
	public String saveFamliyPropertyInfo(Map<String,Object> params){
		int result= 0;
        try{
            result=checkdao.doCreate(params);
        } catch(Exception e){
            e.printStackTrace();
        } finally {
            closeConnection();
        }
        if(result>0){
			return "{success:true}";
		}
		else{
			return "{success:false}";
		}
	}
	/*
    修改模块中保存家庭财产信息
     */
	public String updateFamliyPropertyInfo(Map<String,Object> params){
		int result= 0;
        try{
            result=checkdao.doUpdate(params);
        } catch(Exception e){
            e.printStackTrace();
        } finally {
            closeConnection();
        }
        if(result>0){
			return "{success:true}";
		}
		else{
			return "{success:false}";
		}
	}
    /*
    变更业务;fm001的处理状态由正常或者变更到变更，并保存家庭人员信息，删除核定内容
     */
	public String changeFamliyPropertyInfo(Map<String,Object> params){
		int result= 0;
        try{
            result=checkdao.doChange(params);
        } catch(Exception e){
            e.printStackTrace();
        } finally {
            closeConnection();
        }
        if(result>0){
			return "{success:true}";
		}
		else{
			return "{success:false}";
		}
	}

	/*
    删除家庭财产信息，正常状态下的未提交，可以进行删除操作
     */
	public String delFamliyPropertyInfoByFmy001(Map<String,Object> params){
        int fmy001=-1;
        try{
            fmy001=Integer.parseInt((String)params.get("fmy001"));
        }catch (NumberFormatException e){
            e.printStackTrace();
            return  "{success:false}";
        }
		int result= 0;
        result=checkdao.doDelete(fmy001);
        closeConnection();

        return  result>0? "{success:true}": "{success:false}";

	}

	/*
	*
	* 查询家庭财产信息
	*/
	public String getFamilyPropertyInfo(Map paraMap){
		Map<String,Object>res=new HashMap<String, Object>();
		ResultInfo ri=checkdao.findAll(paraMap);
        List<Map<String, Object>> list=ri.getList();
        for(Map<String,Object> map:list){
            map.put("process", ProcessType.UseProcessType.getNext(ProcessType.UseProcessType.
                    getProcessFromChinese(map.get("processstatus").toString())));
        }
		res.put("totalCount",ri.getCount());
		res.put("results",list);
        closeConnection();          //负责创建连接并负责关闭连接
		return JSONObject.fromObject(res).toString();
	}
    /*
    核定操作人员进行的查询
     */
    public String getFamilyPropertyInfoByCheckRole(Map paraMap){
		Map<String,Object>res=new HashMap<String, Object>();
		ResultInfo ri=null;
        try{
            ri=checkdao.findAllByCheckRole(paraMap);
        }catch (Exception e){
            e.printStackTrace();
        }
        List<Map<String, Object>> list=ri.getList();
        res.put("totalCount",ri.getCount());
		res.put("results",list);
        closeConnection();
		return JSONObject.fromObject(res).toString();
	}
    /*
    根据owerid查询所有的核定信息
     */
    public String getPropertyCheckItemDatilByFmy001(Map paraMap){
		Map<String,Object>res=new HashMap<String, Object>();
		ResultInfo ri=checkdao.getPropertyCheckItemDatilByFmy001(paraMap);
        List<Map<String, Object>> list=ri.getList();
        res.put("totalCount",ri.getCount());
		res.put("results",list);
        closeConnection();
		return JSONObject.fromObject(res).toString();
	}
    /*
       各核定单位进行核定操作
     */
    public String doCheckItem(Map paraMap) {
        int result= 0;

        try{
            result=checkdao.doCheckItem(paraMap);
        }catch(Exception e){
            e.printStackTrace();
        }finally {
            closeConnection();
        }

        if(result>0){
            return "{success:true}";
        }
        else{
            return "{success:false}";
        }
    }

    /*
       申请 -- 提交 状态的改变
     */
    public String changeBusinessStatus(Map paraMap){
        int result=checkdao.changeBusinessProcessStatus(paraMap);
        this.closeConnection();
        if(result>0)return "{success:true}";
        else  return "{success:false}";
    }

    /*
    审核审批
     */
    public String processCheck(Map paraMap){
        String result=checkdao.makeApproval(paraMap);
        this.closeConnection();
        return result;
    }
    public String cancelsubmitbyfmy001(Map paraMap){
        int result=checkdao.cancelSubmit(paraMap);
        this.closeConnection();
        return  result>0? "{success:true}": "{success:false}";
    }

    public String getProcessCheck(Map paraMap){
        Map<String,Object>res=new HashMap<String, Object>();
        ResultInfo ri=checkdao.getPorcessCheck(paraMap);
        List<Map<String, Object>> list=ri.getList();
        res.put("totalCount",ri.getCount());
        res.put("results",list);
        closeConnection();
        return JSONObject.fromObject(res).toString();
    }


    public String getfamilymembersbyfmy001(Map paraMap){
        Map<String,Object>res=new HashMap<String, Object>();
        ResultInfo ri=familymemberdao.getfamilymembersbyfmy001(paraMap);
        List<Map<String, Object>> list=ri.getList();
        res.put("totalCount",ri.getCount());
        res.put("results",list);
        closeConnection();
        return JSONArray.fromObject(list).toString();
        //return JSONObject.fromObject(res).toString();
    }



    public static  Connection getConn(String dbtype) {
        try {

            if(conn==null||conn.isClosed()){
                if(dbtype.equalsIgnoreCase("sqlite")){
                    SqliteSql db=new SqliteSql();
                    conn=db.getConn();
                    //conn.setAutoCommit(false);

                }
                else if(dbtype.equalsIgnoreCase("postgres")){
                    PostgreSql db = new PostgreSql();
                    conn = db.getConn();

                }
            }

        }catch (SQLException ex){
              ex.printStackTrace();
            //log.debug(ex.getMessage());

        }
        return conn;



    }

    public static void main(String[] args){
        ProperCheckControl pc=new ProperCheckControl();
        PreparedStatement pstmt=null;
        try {
            pstmt=pc.conn.prepareStatement("select * from demo where 1=0");
            ResultSet rs=pstmt.executeQuery();
            ResultSetMetaData md=rs.getMetaData();
            int count=md.getColumnCount();
            for(int i=1;i<=count;i++){
                System.out.println(md.getColumnName(i));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            try {
                pstmt.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
            pc.closeConnection();
        }
    }
}
