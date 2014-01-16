<%@ page import="Zsmzj.propertycheck.control.ProperCheckControl" %>
<%@ page import="java.util.Map" %>
<%@ page import="java.util.HashMap" %>
<%@ page import="java.util.Enumeration" %>
<%--
  Created by IntelliJ IDEA.
  User: weipan
  Date: 13-11-19
  Time: 下午14:32
  To change this template use File | Settings | File Templates.
--%>

<%@ page language="java"  contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%
        String tipName="事件名称-";
        String eventName=request.getParameter("eventName");
        if(null==eventName){
            out.print("{success:false,message:'无对应的操作,要指明事件名称'}");
            return;
        }

        Map<String,Object> params=new HashMap<String,Object>();
        ProperCheckControl propchk=new ProperCheckControl();

        if("registerfamilyinfo".equals(eventName)){
            params.put("fm01",request.getParameter("fm01"));
            params.put("familymembers",request.getParameter("familymembers"));
            params.put("isprocess",request.getParameter("isprocess"));
            out.print(propchk.saveFamliyPropertyInfo(params));
        }else if("updatefamilyinfo".equals(eventName)){
            params.put("fm01",request.getParameter("fm01"));
            params.put("fmy001",request.getParameter("fmy001"));
            params.put("familymembers",request.getParameter("familymembers"));
            params.put("isprocess",request.getParameter("isprocess"));
            out.print(propchk.updateFamliyPropertyInfo(params));
        }else if("changefamilyinfo".equals(eventName)){
            params.put("fm01",request.getParameter("fm01"));
            params.put("fmy001",request.getParameter("fmy001"));
            params.put("familymembers",request.getParameter("familymembers"));
            params.put("isprocess",request.getParameter("isprocess"));
            out.print(propchk.changeFamliyPropertyInfo(params));
        }else if("delfamilypropertybyfmy001".equals(eventName)){ //未提交前删除
            Enumeration e  =(Enumeration) request.getParameterNames();
            Map paraMap=new HashMap<String,Object>();
            while(e.hasMoreElements()){
                String name=(String)e.nextElement();
                paraMap.put(name,request.getParameter(name));
            }
            out.print(propchk.delFamliyPropertyInfoByFmy001(paraMap));
        }else if("recoverapplybyfmy001".equals(eventName)){ //未提交前恢复之前的状态
            Enumeration e  =(Enumeration) request.getParameterNames();
            Map paraMap=new HashMap<String,Object>();
            while(e.hasMoreElements()){
                String name=(String)e.nextElement();
                paraMap.put(name,request.getParameter(name));
            }
            out.print(propchk.delFamliyPropertyInfoByFmy001(paraMap));
        }else if("cancelsubmitbyfmy001".equals(eventName)){ //未审核前取消提交
            Enumeration e  =(Enumeration) request.getParameterNames();
            Map paraMap=new HashMap<String,Object>();
            while(e.hasMoreElements()){
                String name=(String)e.nextElement();
                paraMap.put(name,request.getParameter(name));
            }
            out.print(propchk.cancelsubmitbyfmy001(paraMap));
        }else if("getfamilypropertyinfo".equals(eventName)){
            Enumeration e  =(Enumeration) request.getParameterNames();
            Map paraMap=new HashMap<String,Object>();
            while(e.hasMoreElements()){
                  String name=(String)e.nextElement();
                  paraMap.put(name,request.getParameter(name));
            }
            out.print(propchk.getFamilyPropertyInfo(paraMap));
        }else if("getfamilypropertyinfobycheckrole".equals(eventName)){
            Enumeration e  =(Enumeration) request.getParameterNames();
            Map paraMap=new HashMap<String,Object>();
            while(e.hasMoreElements()){
                String name=(String)e.nextElement();
                paraMap.put(name,request.getParameter(name));
            }
            out.print(propchk.getFamilyPropertyInfoByCheckRole(paraMap));
        }else if("checkpropertyitem".equals(eventName)){
            Enumeration e  =(Enumeration) request.getParameterNames();
            Map paraMap=new HashMap<String,Object>();
            while(e.hasMoreElements()){
                String name=(String)e.nextElement();
                paraMap.put(name,request.getParameter(name));
            }
            out.print(propchk.doCheckItem(paraMap));
        }else if("getperopertycheckitemdetailbyowerid".equals(eventName)){
            Enumeration e  =(Enumeration) request.getParameterNames();
            Map paraMap=new HashMap<String,Object>();
            while(e.hasMoreElements()){
                String name=(String)e.nextElement();
                paraMap.put(name,request.getParameter(name));
            }
            out.print(propchk.getPropertyCheckItemDatilByFmy001(paraMap));
        }else if("changebusinessprocessstatus".equals(eventName)){   //提交申请
            Enumeration e  =(Enumeration) request.getParameterNames();
            Map paraMap=new HashMap<String,Object>();
            while(e.hasMoreElements()){
                String name=(String)e.nextElement();
                paraMap.put(name,request.getParameter(name));
            }
            out.print(propchk.changeBusinessStatus(paraMap));
        }
        else if("processcheck".equals(eventName)){      //processcheck   审核审批
            Enumeration e  =(Enumeration) request.getParameterNames();
            Map paraMap=new HashMap<String,Object>();
            while(e.hasMoreElements()){
                String name=(String)e.nextElement();
                paraMap.put(name,request.getParameter(name));
            }
            out.print(propchk.processCheck(paraMap));
        }
        else if("getprocesscheckbyfmy001".equals(eventName)){      //获得审批记录
            Enumeration e  =(Enumeration) request.getParameterNames();
            Map paraMap=new HashMap<String,Object>();
            while(e.hasMoreElements()){
                String name=(String)e.nextElement();
                paraMap.put(name,request.getParameter(name));
            }
            out.print(propchk.getProcessCheck(paraMap));
        }

        else if("getfamilymembersbyfmy001".equals(eventName)){      //获得家庭人员信息
            Enumeration e  =(Enumeration) request.getParameterNames();
            Map paraMap=new HashMap<String,Object>();
            while(e.hasMoreElements()){
                String name=(String)e.nextElement();
                paraMap.put(name,request.getParameter(name));
            }
            out.print(propchk.getfamilymembersbyfmy001(paraMap));
        }


         //无相应处理时的默认操作提示
        else{
            out.print("{success:'false',message:'无对应的操作'}");
        }
%>