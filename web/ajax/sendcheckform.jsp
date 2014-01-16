<%--
  Created by IntelliJ IDEA.
  User: jack
  Date: 13-8-9
  Time: 上午10:20
  To change this template use File | Settings | File Templates.
--%>

<%@ page import="Zsmzj.business.control.BusinessProcessControl" %>
<%@ page import="java.util.Map" %>
<%@ page import="java.util.Enumeration" %>
<%@ page import="java.util.HashMap" %>
<%@ page language="java"  contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%
    if(request.getParameter("businessid")==null){
       out.print("缺少参数businessid");
    }
    else{
        Map<String,Object> params=new HashMap<String,Object>();
        boolean isapproval=false;
        String processstatus="";
        /*
        *获取请求参数
        */
        Enumeration e  =(Enumeration) request.getParameterNames();
        while(e.hasMoreElements()){

            String  parName=(String)e.nextElement();
            if(parName.equals("isapproval")){
                isapproval=Boolean.parseBoolean(request.getParameter(parName));
            }
            else if(parName.equals("processstatus")){
                processstatus= request.getParameter(parName);
            }else{
                params.put(parName,request.getParameter(parName));
            }

        }
        BusinessProcessControl pc=new BusinessProcessControl();
        out.print(pc.makeApproval(params,isapproval,processstatus));
    }
%>