package Zsmzj.propertycheck;

import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-7
 * Time: 下午6:59
 * To change this template use File | Settings | File Templates.
 */
public interface FamilyMemberDAO {
    int saveFamilyMembers(Map<String, Object> params, int fmy001);
    int doUpdate(Map<String, Object> param);
    ResultInfo getfamilymembersbyfmy001(Map paraMap);
}
