package Zsmzj.propertycheck;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-1
 * Time: 上午9:09
 * To change this template use File | Settings | File Templates.
 */
public class ResultInfo {
    private int count=0;
    private List<Map<String,Object>> list=null;

    public ResultInfo() {
    }

    public ResultInfo(int count, List<Map<String, Object>> list) {
        this.count = count;
        this.list = list;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public List<Map<String, Object>> getList() {
        return list;
    }

    public void setList(List<Map<String, Object>> list) {
        this.list = list;
    }
}
