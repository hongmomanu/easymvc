package Zsmzj.enums;

/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-23
 * Time: 上午9:52
 * To change this template use File | Settings | File Templates.
 */
public enum ProcessType {

    Apply(1),Submit(2), Check(3), Approval(4), Grant(5),Cancellation(6),Callback(7),NoProcess(8),Change(9),Ok(10);

    private int code;
    private ProcessType(int code){
        this.code = code;
    }

    public int getCode(){
        return code;
    }


    public static class UseProcessType {
        /**
         * 将英文的季节转换成中文季节
         * @param pType
         * @return
         */

        public static String getPrevious(ProcessType pType){
            String result = "";
            switch(pType){
                case Submit:
                    result ="申请";
                    break;
                case Check:
                    result = "提交";
                    break;
                case Approval:
                    result = "审核";
                    break;
                case Grant:
                    result = "审批";
                    break;
                default :
                    result = "其他";
                    break;
            }
            return result.toString();
        }



        public static String getNext(ProcessType pType){
            String result = "";
            switch(pType){
                case Callback:
                    result ="提交" ;
                    break;
                case Apply :
                    result ="提交" ;
                    break;
                case Submit:
                    result ="审核";
                    break;
                case Check:
                    result = "审批";
                    break;
                case Approval:
                    result = "资金发放";
                    break;
                case Grant :
                    result = "正享受";
                    break;
                default :
                    result = "其他";
                    break;
            }
            return result.toString();



        }

        public static ProcessType getProcessFromChinese(String str){
            ProcessType pType=null;
            if (str.equals("申请")) {
                pType = Apply;

            } else if (str.equals("提交")) {
                pType = Submit;

            } else if (str.equals("审核")) {
                pType = Check;

            } else if (str.equals("审批")) {
                pType = Approval;

            } else if (str.equals("资金发放")) {
                pType = Grant;

            } else if (str.equals("注销")) {
                pType = Cancellation;

            } else if (str.equals("退回")) {
                pType = Callback;

            } else {
                pType = Apply;

            }
            return  pType;
        }


        public static String getChineseSeason(ProcessType pType){
            String result = "";
            switch(pType){
                case Apply :
                    result ="申请" ;
                    break;
                case Callback:
                    result ="退回" ;
                    break;
                case Submit:
                    result = "提交";
                    break;
                case Check:
                    result = "审核";
                    break;
                case Approval:
                    result = "审批";
                    break;
                case Grant:
                    result = "资金发放";
                    break;
                case Cancellation:
                    result = "注销";
                    break;
                case NoProcess:
                    result = "无流程";
                    break;
                case Change:
                    result="变更";
                    break;
                case  Ok:
                    result="正常";
                    break;
                default :
                    result = "其他";
                    break;
            }
            return result.toString();
        }

    }


    }
