package Zsmzj.propertycheck;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-11-19
 * Time: 下午7:57
 * To change this template use File | Settings | File Templates.
 */
public interface PropertyCheckDAO {

	public int doCreate(Map<String, Object> param);
	public int doUpdate(Map<String, Object> param);
	public int doChange(Map<String, Object> param);
	public int doDelete(int fmy001);
	public int cancelSubmit(Map<String, Object> param);

	public ResultInfo findAll(Map paraMap);
	public ResultInfo findAllByCheckRole(Map paraMap);
	public int getCount(String keyword, int type);
	public Map<String,Object> findById(int pid, int type);
    public int changeBusinessProcessStatus(Map<String, Object> param);


    public int doCheckItem(Map<String, Object> param);
    public ResultInfo getPropertyCheckItemDatilByFmy001(Map<String, Object> param) ;


    //审核流程
    public String makeApproval(Map<String, Object> param);
    public ResultInfo getPorcessCheck(Map<String, Object> param);

}
