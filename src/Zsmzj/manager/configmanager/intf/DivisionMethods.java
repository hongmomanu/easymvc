package Zsmzj.manager.configmanager.intf;

import java.util.ArrayList;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-16
 * Time: 上午11:07
 * To change this template use File | Settings | File Templates.
 */
public interface DivisionMethods {
    ArrayList<Map<String, Object>> getDivisions(int parentid); //获取行政区划接口
    ArrayList<Map<String, Object>> getDivisionsByKeyword(String keyword); //更具关键字获取获取行政区划接口
    int addDivision(String divisionname, String divisionpath, int parentid, String signaturepath);
    int delDivision(int divisionid);
    int editlDivision(int divisionid, String divisionname, String signaturepath);
}
