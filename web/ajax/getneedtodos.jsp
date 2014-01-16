<%--
  Created by IntelliJ IDEA.
  User: jack
  Date: 13-8-9
  Time: 上午10:20
  To change this template use File | Settings | File Templates.
--%>

<%@ page import="Zsmzj.manager.usermanager.business.RoleControl" %>
<%@ page import="Zsmzj.business.control.BusinessProcessControl" %>
<%@ page language="java"  contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%
    if(request.getParameter("roleid")==null){
       out.print("缺少参数roleid");
    }if(request.getParameter("type")==null){
        out.print("缺少参数type");
    }
    else{
        int roleid=Integer.parseInt(request.getParameter("roleid"));
        int userid=Integer.parseInt(request.getParameter("userid"));
        String divisionpath=request.getParameter("divisionpath");
        String type=request.getParameter("type");
        if(type.equals("count")){
            BusinessProcessControl bp=new BusinessProcessControl();
            int count=bp.getNeedTodoCounts(roleid,userid,divisionpath);
            out.print("{count:"+count+"}");

        }
        else if(type.equals("list")){
            BusinessProcessControl bp=new BusinessProcessControl();
            int start=Integer.parseInt(request.getParameter("start"));
            int limit=Integer.parseInt(request.getParameter("limit"));
            String keyword=request.getParameter("keyword");
            out.print(bp.getNeedTodoList(roleid,userid,divisionpath,start,limit,keyword));
        }
    }
    //out.print("ok");
%>