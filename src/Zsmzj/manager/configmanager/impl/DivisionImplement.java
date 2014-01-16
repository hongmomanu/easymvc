package Zsmzj.manager.configmanager.impl;

import Zsmzj.manager.configmanager.dao.DivisionDao;
import Zsmzj.manager.configmanager.intf.DivisionMethods;

import java.util.ArrayList;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-26
 * Time: 下午4:03
 * To change this template use File | Settings | File Templates.
 */
public class DivisionImplement implements DivisionMethods {
    @Override
    public ArrayList<Map<String, Object>> getDivisions(int parentid) {
        DivisionDao dd=new DivisionDao();
        return dd.getDivisions(parentid);
    }

    @Override
    public ArrayList<Map<String, Object>> getDivisionsByKeyword(String keyword) {
        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public int addDivision(String divisionname, String divisionpath, int parentid,String signaturepath) {

        DivisionDao dd=new DivisionDao();
        return dd.addNewDivision(divisionname,divisionpath,parentid,signaturepath);

    }

    @Override
    public int delDivision(int divisionid) {
        DivisionDao dd=new DivisionDao();
        return dd.delDivision(divisionid);
    }

    @Override
    public int editlDivision(int divisionid, String divisionname, String signaturepath) {
        DivisionDao dd=new DivisionDao();
        return dd.editDivision(divisionid,divisionname,signaturepath);
    }
}
