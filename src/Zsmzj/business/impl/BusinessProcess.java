package Zsmzj.business.impl;

import Zsmzj.business.dao.BusinessProcessDao;
import Zsmzj.business.intf.BusinessProcessIntf;
import Zsmzj.conmmon.ComonDao;
import Zsmzj.enums.ProcessType;
import Zsmzj.jdbc.JdbcFactory;
import Zsmzj.manager.usermanager.impl.FuncImplement;
import Zsmzj.manager.usermanager.impl.RoleImplement;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.log4j.Logger;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-22
 * Time: 下午2:36
 * To change this template use File | Settings | File Templates.
 */
public class BusinessProcess implements BusinessProcessIntf {
    private static final Logger log = Logger.getLogger(BusinessProcess.class);
    private static final String  BusinessTable="business";
    private static final String  BusinessChangeTable="businesschange";
    private static final String  VirtualindexTable="virtualindexrelation";
    private static final String FamilyTable="familymembers" ;
    private final String FamilyHistoryTable="familymembershistory";
    private static final String SignatureTable="businesssignature";
    private static final String AttachmentTable="attachment";
    private static final String DivisionTable="divisions";
    private static final String ApprovalTable= "approvalprocess";
    private static final String NeedKey="待办事务";
    @Override
    public int saveApplyBusiness(Map<String, Object> param,boolean isprocess) {
        String proStatus="";
        if(isprocess){
            proStatus= ProcessType.UseProcessType.getChineseSeason(ProcessType.Apply);
        }else{
            proStatus= ProcessType.UseProcessType.getChineseSeason(ProcessType.NoProcess);
        }

        param.put("processstatus",proStatus);
        BusinessProcessDao bDao=new BusinessProcessDao();
        return bDao.insertTableVales(param, BusinessTable);


    }

    @Override
    public int insertBusinessChange(int businessid) {
        BusinessProcessDao bDao=new BusinessProcessDao();
        return bDao.insertBusinessChange(businessid, BusinessTable,BusinessChangeTable);
    }

    @Override
    public int insertFamilyChange(int businessid) {
        BusinessProcessDao bDao=new BusinessProcessDao();
        return bDao.insertFamilyChange(businessid, FamilyTable,FamilyHistoryTable);
    }


    @Override
    public int updateApplyBusiness(int businessid, Map<String, Object> param) {
        BusinessProcessDao bDao=new BusinessProcessDao();
        return bDao.updateTableVales(param, BusinessTable, businessid, "id");
    }

    @Override
    public int saveFamilyMembers(String membersjson,int businessid,String familytablename) {

        int result_num=0;
        JSONArray arr=JSONArray.fromObject(membersjson);
        for(Object item:arr){
            JSONObject jsonitem=JSONObject.fromObject(item);
            Iterator<?> it = jsonitem.keys();
            Map<String,Object> mp=new HashMap<String, Object>();
            mp.put("businessid",businessid);

            while(it.hasNext()){//遍历JSONObject
                String name = (String) it.next().toString();
                if(name.equals("age"))continue;
                String value = jsonitem.getString(name);
                mp.put(name,value);

            }
            BusinessProcessDao bDao=new BusinessProcessDao();
            result_num=bDao.insertTableVales(mp, familytablename);

        }
        return result_num;
    }

    @Override
    public int updateFamilyMembers(String membersjson, int businessid) {

        BusinessProcessDao bDao=new BusinessProcessDao();
        bDao.deldatabyid(businessid,FamilyTable,"businessid",false);

        /*ComonDao cd=new ComonDao();
        cd.delbysql("delete from "+VirtualindexTable +" where oid="+businessid);*/


        int result_num=0;
        JSONArray arr=JSONArray.fromObject(membersjson);
        for(Object item:arr){
            JSONObject jsonitem=JSONObject.fromObject(item);
            Iterator<?> it = jsonitem.keys();
            Map<String,Object> mp=new HashMap<String, Object>();
            mp.put("businessid",businessid);

            while(it.hasNext()){//遍历JSONObject
                String name = (String) it.next().toString();
                if(name.equals("age"))continue;
                String value = jsonitem.getString(name);
                mp.put(name,value);

            }

            result_num=bDao.insertTableVales(mp, FamilyTable);


           /* String insert_sql="insert into "+VirtualindexTable+"(oid,aid,otable,atable) values("+businessid+","+
                    result_num+",'"+BusinessTable+"','"+FamilyTable+"')";
            cd.delbysql(insert_sql);*/



        }
        return result_num;

    }

    @Override
    public int updateSignatures(String signaturesjson, int businessid) {
        BusinessProcessDao bDao=new BusinessProcessDao();
        bDao.deldatabyid(businessid,SignatureTable,"businessid",false);

        int result_num=0;
        JSONArray arr=JSONArray.fromObject(signaturesjson);
        for(Object item:arr){
            JSONObject jsonitem=JSONObject.fromObject(item);
            Iterator<?> it = jsonitem.keys();
            Map<String,Object> mp=new HashMap<String, Object>();
            mp.put("businessid",businessid);

            while(it.hasNext()){//遍历JSONObject
                String name = (String) it.next().toString();
                String value = jsonitem.getString(name);
                mp.put(name,value);

            }

            result_num=bDao.insertTableVales(mp, SignatureTable);

        }
        return result_num;

    }

    @Override
    public int saveAffixFiles(String filesjson,int businessid) {

        log.debug(filesjson);

        int result_num=0;
        JSONArray arr=JSONArray.fromObject(filesjson);
        for(Object item:arr){
            JSONObject jsonitem=JSONObject.fromObject(item);
            Iterator<?> it = jsonitem.keys();
            Map<String,Object> mp=new HashMap<String, Object>();
            mp.put("businessid",businessid);

            while(it.hasNext()){//遍历JSONObject
                String name = (String) it.next().toString();
                mp.put("attachmenttype",name);
                JSONArray value = jsonitem.getJSONArray(name);

                for(Object item_value:value){

                    JSONObject jsonitem_value=JSONObject.fromObject(item_value);
                    Iterator<?> it_value = jsonitem_value.keys();
                    while(it_value.hasNext()){//遍历JSONObject
                        String name_value = (String) it_value.next().toString();
                        String value_value=jsonitem_value.getString(name_value);
                        mp.put(name_value,value_value);
                    }

                    BusinessProcessDao bDao=new BusinessProcessDao();
                    result_num=bDao.insertTableVales(mp,AttachmentTable);
                }
            }
        }
        return result_num;


    }

    @Override
    public int updateAffixFiles(String filesjson, int businessid) {


        BusinessProcessDao bDao=new BusinessProcessDao();
        bDao.deldatabyid(businessid,AttachmentTable,"businessid",false);

        int result_num=0;
        JSONArray arr=JSONArray.fromObject(filesjson);
        for(Object item:arr){
            JSONObject jsonitem=JSONObject.fromObject(item);
            Iterator<?> it = jsonitem.keys();
            Map<String,Object> mp=new HashMap<String, Object>();
            mp.put("businessid",businessid);

            while(it.hasNext()){//遍历JSONObject
                String name = (String) it.next().toString();
                mp.put("attachmenttype",name);
                JSONArray value = jsonitem.getJSONArray(name);

                for(Object item_value:value){

                    JSONObject jsonitem_value=JSONObject.fromObject(item_value);
                    Iterator<?> it_value = jsonitem_value.keys();
                    while(it_value.hasNext()){//遍历JSONObject
                        String name_value = (String) it_value.next().toString();
                        String value_value=jsonitem_value.getString(name_value);
                        mp.put(name_value,value_value);
                    }
                    result_num=bDao.insertTableVales(mp,AttachmentTable);
                }

            }


        }
        return result_num;


    }

    @Override
    public int getNeedTodoCounts(int roleid,int userid,String divisionpath,String keyword) {
        FuncImplement func=new FuncImplement();
        ArrayList<Map<String, Object>> status_arr =func.getFuncsByRole(roleid, NeedKey);
        if(status_arr.size()==0)return 0;
        BusinessProcessDao bpDao=new BusinessProcessDao();
        return bpDao.getNeedToDoCounts(status_arr,keyword,BusinessTable,userid,divisionpath);

    }

    @Override
    public ArrayList<Map<String, Object>> getNeedTodoList(int roleid,int userid,String divisionpath,int start,int limit,String keyword) {
        FuncImplement func=new FuncImplement();
        ArrayList<Map<String, Object>> status_arr =func.getFuncsByRole(roleid, NeedKey);
        ArrayList<Map<String,Object>> list=new ArrayList<Map<String, Object>>();
        if(status_arr.size()==0)return list;
        BusinessProcessDao bpDao=new BusinessProcessDao();
        return bpDao.getNeedToDoLists(status_arr,start,limit,keyword,BusinessTable,userid,divisionpath);



    }

    @Override
    public ArrayList<Map<String, Object>> getProcessHistory(int businessid, int start, int limit) {

        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public int changeStatus(int businessid, String status) {

        BusinessProcessDao bpDao=new BusinessProcessDao();
        return bpDao.changeStatus(businessid,status,BusinessTable);
    }

    @Override
    public int changeProcessStatustype(int businessid, String processstatustype,String processstatus) {
        BusinessProcessDao bpDao=new BusinessProcessDao();
        return bpDao.changeProcessStatustype(businessid,processstatustype,processstatus,BusinessTable);
    }

    @Override
    public Map<String, Object> getApplyForm(int businessid) {
        BusinessProcessDao bpDao=new BusinessProcessDao();
        return bpDao.getApplyForm(businessid,BusinessTable);
    }

    @Override
    public ArrayList<Map<String, Object>> getAffixfilebybid(int businessid) {
        BusinessProcessDao bpDao=new BusinessProcessDao();
        return bpDao.getAffixfilebybid(businessid, AttachmentTable);
    }

    @Override
    public ArrayList<Map<String, Object>> getFamilymembersbybid(int businessid) {
        BusinessProcessDao bpDao=new BusinessProcessDao();
        return bpDao.getFamilymembersbybid(businessid, FamilyTable);
    }

    @Override
    public int delBusinessbybid(int businessid) {
        Connection conn= JdbcFactory.getConn("sqlite");

        try {
            conn.setAutoCommit(false);
            BusinessProcessDao bpdao=new BusinessProcessDao();
            bpdao.deldatabyid(businessid,BusinessTable,"rowid",false);
            bpdao.deldatabyid(businessid,FamilyTable,"businessid",false);
            bpdao.deldatabyid(businessid,AttachmentTable,"businessid",false);
            conn.commit();
            conn.setAutoCommit(true);
            return 1;
        }catch (SQLException e) {
            try {
                conn.rollback();
            } catch (SQLException e1) {
                e1.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            }finally {
                return -1;
            }
            //e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        }

    }

    @Override
    public int makeApproval(Map<String,Object> map) {
        BusinessProcessDao bpdao=new BusinessProcessDao();
        return bpdao.insertTableVales(map,ApprovalTable);
    }

    @Override
    public Map<String, Object> getSignaturebybuid(int userid) {
        BusinessProcessDao bpdao=new BusinessProcessDao();
        return bpdao.getSignaturebybuid(userid, DivisionTable);
    }
}
