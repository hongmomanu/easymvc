package Zsmzj.manager.configmanager.impl;

import Zsmzj.manager.configmanager.dao.EnumDao;
import Zsmzj.manager.configmanager.intf.EnumMethods;

import java.util.ArrayList;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-16
 * Time: 上午11:09
 * To change this template use File | Settings | File Templates.
 */
public class EnumImplement implements EnumMethods {
    @Override
    public ArrayList<Map<String, Object>> getEnums(int start, int limit, String keyword) {
        EnumDao dao=new EnumDao();
        return dao.getEnums(start, limit, keyword);
    }

    @Override
    public ArrayList<Map<String, Object>> getEnumsByType(String type) {
        EnumDao dao=new EnumDao();
        return dao.getEnumsByType(type);

    }

    @Override
    public int addEnum(String label, String value, String type) {
        EnumDao dao=new EnumDao();
        return dao.addNewEnum(label, value, type);
    }
}
