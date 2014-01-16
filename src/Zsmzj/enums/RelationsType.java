package Zsmzj.enums;

/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-23
 * Time: 上午9:52
 * To change this template use File | Settings | File Templates.
 */
public enum RelationsType {

    ower(1),other(2);
    private int code;
    private RelationsType(int code){
        this.code = code;
    }

    public int getCode(){
        return code;
    }


    public static class UseRelationsType {

        public static String getChineseSeason(RelationsType pType){
            String result = "";
            switch(pType){
                case ower:
                    result ="户主" ;
                    break;
                case other:
                    result="其它";
                    break;

                default :
                    result = "其他";
                    break;
            }
            return result.toString();
        }

    }


    }
