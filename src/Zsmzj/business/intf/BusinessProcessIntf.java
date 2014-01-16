package Zsmzj.business.intf;

import java.util.ArrayList;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-22
 * Time: 下午2:30
 * To change this template use File | Settings | File Templates.
 */
public interface BusinessProcessIntf {
    /**
     * saveApplyBusiness  saveFamilyMembers   saveAffixFiles 三个接口属于同一trancsiction
     * ***/
    public int saveApplyBusiness(Map<String, Object> param, boolean isprocess);//提交业务信息

    public int insertBusinessChange(int businessid);//保存变更信息
    public int insertFamilyChange(int businessid);//保存家庭人员变更信息

    public int updateApplyBusiness(int businessid, Map<String, Object> param);//更新业务信息

    public int saveFamilyMembers(String membersjson, int businessid, String tablename);//保存家庭成员信息
    public int updateFamilyMembers(String membersjson, int businessid);//更新家庭成员信息
    public int updateSignatures(String signatures, int businessid);

    public int saveAffixFiles(String filesjson, int businessid);//保存附件信心
    public int updateAffixFiles(String filesjson, int businessid);//更新附件信心

    public int getNeedTodoCounts(int roleid, int userid, String divisionpath, String keyword);//获取待办事务
    public ArrayList<Map<String,Object>> getNeedTodoList(int roleid, int userid, String divisionpath, int start, int limit, String keyword);//获取待办事务列表
    public ArrayList<Map<String,Object>> getProcessHistory(int businessid, int start, int limit);//获取待办事务列表
    public int changeStatus(int businessid, String type);//改变事务状态
    public int changeProcessStatustype(int businessid, String processstatustype, String processstatus);//改变流程类型
    public Map<String,Object> getApplyForm(int businessid);//获取提交信息
    public ArrayList<Map<String,Object>> getAffixfilebybid(int businessid);//获取提交附件信息
    public ArrayList<Map<String,Object>> getFamilymembersbybid(int businessid); //获取家庭成员
    public int delBusinessbybid(int businessid);//删除申请的业务
    public int makeApproval(Map<String, Object> param);//插入审批流程
    public Map<String,Object>getSignaturebybuid(int userid);//根据操作用户获取签章图片
}
