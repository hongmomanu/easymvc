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
public interface EnumMethods {
    ArrayList<Map<String, Object>> getEnums(int start, int limit, String keyword); //获取枚举接口
    ArrayList<Map<String, Object>> getEnumsByType(String type); //更具类型获取枚举接口
    int addEnum(String label, String value, String type);
}
