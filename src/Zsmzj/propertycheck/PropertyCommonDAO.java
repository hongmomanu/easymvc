package Zsmzj.propertycheck;

import java.sql.ResultSetMetaData;
import java.util.List;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-7
 * Time: 下午6:08
 * To change this template use File | Settings | File Templates.
 */
public interface PropertyCommonDAO {
    public int insertTableVales(Map<String, Object> col_vals, String tablename);
    public int updateTableVales(Map<String, Object> col_vals, String tablename, Map<String, String> colnames);
    public int updateTableValesSpecail(Map<String, Object> col_vals, String tablename, Map<String, String> colnames, String kandv);
    public List<String> getColumnData(String tablename);
    int deleteTableValues(String sql);
    void execute(String sql);
    boolean isExist(String sql);

}
