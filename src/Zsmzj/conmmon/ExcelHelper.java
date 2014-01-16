package Zsmzj.conmmon;

import jxl.Workbook;
import jxl.format.*;
import jxl.format.Alignment;
import jxl.write.*;
import jxl.write.biff.RowsExceededException;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.log4j.Logger;

import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-9-9
 * Time: 下午1:45
 * To change this template use File | Settings | File Templates.
 */
public class ExcelHelper {
    private static final Logger log = Logger.getLogger(ExcelHelper.class);

    public static Map<String, Object> writeExcel(String fileName, String header_arr, String rowdata, String sum,
                                                 String title, int headerheight,int headercols,boolean isall,String url,String extraParams) {
        WritableWorkbook wwb = null;
        Map<String, Object> map = new HashMap<String, Object>();
        int sumrow_index = 0;
        map.put("isok", false);
        try {
            //首先要使用Workbook类的工厂方法创建一个可写入的工作薄(Workbook)对象
            File file = new File(fileName);
            file.getParentFile().mkdirs();
            file.createNewFile();
            wwb = Workbook.createWorkbook(file);
        } catch (IOException e) {
            e.printStackTrace();
        }
        JSONObject sum_item = JSONObject.fromObject(sum);
        if (wwb != null) {
            //创建一个可写入的工作表
            //Workbook的createSheet方法有两个参数，第一个是工作表的名称，第二个是工作表在工作薄中的位置
            WritableSheet ws = wwb.createSheet("sheet1", 0);
            JSONArray headers = JSONArray.fromObject(header_arr);
            JSONArray rowdatas=new JSONArray();
            if(isall){
               JSONObject urlparam=JSONObject.fromObject(extraParams);
                String urlparamsstr="";
                for (Object param_name : urlparam.names()) {
                    String value=urlparam.get(param_name).toString();
                    if(value.equals("null"))continue;
                    try {
                        urlparamsstr+=param_name.toString()+"="+ URLEncoder.encode(value, "UTF-8")+"&";
                    } catch (UnsupportedEncodingException e) {
                        e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
                    }

                }
                urlparamsstr+="limit=0&start=-1";

                rowdatas=JSONObject.fromObject(UrlConnectHelper.sendPost(url,urlparamsstr)).getJSONArray("results");
                Map<String,Double> sum_new=new HashMap<String, Double>();
                for (Object sum_name : sum_item.names()) {
                    sum_new.put(sum_name.toString(),0.0);

                }

                for (int row_index = 0; row_index < rowdatas.size(); row_index++) {

                    for (Object sum_name : sum_item.names()) {
                        sum_new.put(sum_name.toString(),sum_new.get(sum_name.toString())+
                                Double.parseDouble(JSONObject.fromObject(rowdatas.get(row_index)).getString(sum_name.toString())));

                    }
                    String division=JSONObject.fromObject(rowdatas.get(row_index)).getString("division");
                    String sql="select parentid,divisionname from divisions where divisionpath MATCH '"+division+"'";
                    ComonDao cd=new ComonDao();
                    Map<String,Object> item=cd.getSigleObj(sql);
                    int parentid=Integer.parseInt(item.get("parentid").toString());
                    String divisionname=item.get("divisionname").toString();
                    ArrayList<String>result=new ArrayList<String>();
                    result.add(divisionname);
                    result=getDivisionTreeBypath(parentid,"divisions",result);
                    JSONObject row=JSONObject.fromObject(rowdatas.get(row_index));
                    for(int i=result.size()-1;i>=0;i--){
                       if(i==(result.size()-1)){
                           row.put("city",result.get(i));
                       }
                       if(i==(result.size()-2)){
                           row.put("county",result.get(i));
                       }
                       if(i==(result.size()-3)){
                           row.put("town",result.get(i));
                       }
                       if(i==(result.size()-4)){
                           row.put("village",result.get(i));
                       }

                    }
                    rowdatas.set(row_index, row);

                }
                sum_item=JSONObject.fromObject(sum_new);


            }else{
                rowdatas = JSONArray.fromObject(rowdata);
            }

            try {
                WritableFont font = new WritableFont(WritableFont.createFont("宋体"),
                        15,
                        WritableFont.BOLD,
                        false,
                        UnderlineStyle.NO_UNDERLINE);
                ws.mergeCells(0, 0, headercols - 1, 0);
                Label labelTitle = new Label(0, 0, title);
                WritableCellFormat cellFormat = new WritableCellFormat();
                cellFormat.setAlignment(jxl.format.Alignment.CENTRE);
                cellFormat.setFont(font);
                labelTitle.setCellFormat(cellFormat);
                ws.addCell(labelTitle);
            } catch (WriteException e) {
                e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            }
            WritableFont font = new WritableFont(WritableFont.createFont("宋体"),
                    10,
                    WritableFont.BOLD,
                    false,
                    UnderlineStyle.NO_UNDERLINE);
            makemultiheader(ws, headers, 0, rowdatas, sum_item, sumrow_index,headerheight);

            try {
                //从内存中写入文件中
                wwb.write();
                //关闭资源，释放内存
                wwb.close();
                map.put("isok", true);
                map.put("path", fileName);

            } catch (IOException e) {
                e.printStackTrace();
            } catch (WriteException e) {
                e.printStackTrace();
            }
        }
        return map;
    }

    public  static ArrayList<String> getDivisionTreeBypath(int parentid,String tablename,ArrayList<String> result){

        if(parentid<0){
             return result;
        }else{
            String sql="select divisionname,parentid from "+tablename+" where rowid = "+parentid;
            ComonDao cd=new ComonDao();
            Map<String,Object> item=cd.getSigleObj(sql);
            result.add(item.get("divisionname").toString());
            parentid=Integer.parseInt(item.get("parentid").toString());
            return  getDivisionTreeBypath(parentid,tablename,result);
        }
    }
    public static void makemultiheader(WritableSheet ws, JSONArray headers,
                                       int colindex, JSONArray rowdatas, JSONObject sum_item, int sumrow_index,int headerheight) {
        WritableFont font = new WritableFont(WritableFont.createFont("宋体"),
                10,
                WritableFont.BOLD,
                false,
                UnderlineStyle.NO_UNDERLINE);
        for (int j = colindex; j < headers.size()+colindex; j++) {
            if(headers.getJSONObject(j-colindex).getJSONArray("columns").size()>0){
                makemultiheader(ws,headers.getJSONObject(j-colindex).getJSONArray("columns"),j,rowdatas,sum_item,sumrow_index,headerheight);
            }

            try {
                String col_name = headers.getJSONObject(j-colindex).getString("value");
                //添加表头
                WritableCellFormat cellFormat = new WritableCellFormat();
                cellFormat.setAlignment(jxl.format.Alignment.CENTRE);
                cellFormat.setFont(font);

                JSONArray cols=headers.getJSONObject(j-colindex).getJSONArray("col");
                JSONArray rows=headers.getJSONObject(j-colindex).getJSONArray("row");
                ws.mergeCells(cols.getInt(0), rows.getInt(0), cols.getInt(1), rows.getInt(1));

                Label labelC = new Label(cols.getInt(0), rows.getInt(0), headers.getJSONObject(j-colindex).getString("name"));
                labelC.setCellFormat(cellFormat);
                ws.addCell(labelC);


                //添加行数据
                for (int row_index = 0; row_index < rowdatas.size(); row_index++) {
                    WritableCellFormat cellRowFormat = new WritableCellFormat();
                    cellRowFormat.setAlignment(jxl.format.Alignment.CENTRE);
                    sumrow_index = row_index + headerheight+1;
                    Label labelRowC = null;

                    if (col_name.equals("index")) {
                        labelRowC = new Label(cols.getInt(0), sumrow_index, String.valueOf(row_index + 1));

                    } else {

                            if(rowdatas.getJSONObject(row_index).has(col_name)){
                                labelRowC = new Label(cols.getInt(0), sumrow_index,rowdatas.getJSONObject(row_index).
                                        getString(col_name).equals("null")?"":rowdatas.getJSONObject(row_index).
                                        getString(col_name));
                            }
                            else continue;

                    }
                    labelRowC.setCellFormat(cellRowFormat);
                    ws.addCell(labelRowC);

                }

                //添加合计数据
                sumrow_index++;
                Label labelSumC = null;
                WritableCellFormat cellRowFormat = new WritableCellFormat();
                cellRowFormat.setAlignment(jxl.format.Alignment.CENTRE);

                if (j == 0) {
                    labelSumC = new Label(j, sumrow_index, "合计");
                    labelSumC.setCellFormat(cellRowFormat);
                    ws.addCell(labelSumC);

                } else {
                    for (Object sum_name : sum_item.names()) {

                        if (col_name.equals(sum_name.toString())) {
                            labelSumC = new Label(j, sumrow_index, sum_item.get(sum_name).toString());
                            labelSumC.setCellFormat(cellRowFormat);
                            ws.addCell(labelSumC);
                            break;
                        }
                    }
                }


                //添加表单数据
                if (j == 0) {
                    sumrow_index++;
                    ws.mergeCells(0, sumrow_index, headers.size() / 2 - 1, sumrow_index);
                    ws.mergeCells(headers.size() / 2, sumrow_index, headers.size() - 1, sumrow_index);
                    Label labelLast_head_C = new Label(0, sumrow_index, "填表人:          分管领导:");
                    WritableCellFormat cellLastRowHeaderFormat = new WritableCellFormat();
                    cellLastRowHeaderFormat.setAlignment(Alignment.LEFT);
                    cellLastRowHeaderFormat.setFont(font);
                    labelLast_head_C.setCellFormat(cellLastRowHeaderFormat);
                    ws.addCell(labelLast_head_C);

                    String date_str = StringHelper.getTimeStrFormat("yyyy-MM-dd");
                    Label labelLast_tail_C = new Label(headers.size() / 2, sumrow_index, "填表日期: " + date_str);
                    WritableCellFormat cellLastRowTailFormat = new WritableCellFormat();
                    cellLastRowTailFormat.setAlignment(Alignment.RIGHT);
                    cellLastRowTailFormat.setFont(font);
                    labelLast_tail_C.setCellFormat(cellLastRowTailFormat);
                    ws.addCell(labelLast_tail_C);


                }


            } catch (RowsExceededException e) {
                log.debug(e.getMessage());
            } catch (WriteException e) {
                log.debug(e.getMessage());
            }

        }


    }


}
