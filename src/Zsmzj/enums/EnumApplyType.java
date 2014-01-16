package Zsmzj.enums;

/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-23
 * Time: 上午9:52
 * To change this template use File | Settings | File Templates.
 */
public enum EnumApplyType {

    A(1),B(2),C(3),Farmer(4),Forester(5),Criminal(6),Compatriot(7),Immigrant(8),Graduate(9),
    Veterans(10),CountryAccount(11),CityAccount(12);

    private int code;
    private EnumApplyType(int code){
        this.code = code;
    }

    public int getCode(){
        return code;
    }


    public static class UseStatisticsType {



        public static String getChineseSeason(EnumApplyType pType){
            String result = "";
            switch(pType){
                case A:
                    result ="A类" ;
                    break;
                case B:
                    result="B类";
                    break;
                case C:
                    result="C类";
                    break;
                case Farmer:
                    result="农垦企业人员(含农场)";
                    break;
                case Forester:
                    result="森工企业(含国有林场)";
                    break;
                case Criminal:
                    result="两劳释放人员";
                    break;
                case Compatriot:
                    result="散居归侨侨眷";
                    break;
                case Immigrant:
                    result="非农水库移民";
                    break;
                case Graduate:
                    result="高校毕业生";
                    break;
                case Veterans:
                    result="退役军人";
                    break;
                case CityAccount:
                    result="城镇";
                    break;
                case CountryAccount:
                    result="农村";
                    break;

                default :
                    result = "其他";
                    break;
            }
            return result.toString();
        }

    }


    }
