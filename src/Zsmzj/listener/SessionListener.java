package Zsmzj.listener; /**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-13
 * Time: 下午3:19
 * To change this template use File | Settings | File Templates.
 */

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;
import javax.servlet.http.HttpSessionAttributeListener;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;
import javax.servlet.http.HttpSessionBindingEvent;
import java.sql.Timestamp;
import java.util.HashMap;

@WebListener()
public class SessionListener implements ServletContextListener,
        HttpSessionListener, HttpSessionAttributeListener {

    // Public constructor is required by servlet spec
    public SessionListener() {
    }

    private static HashMap _U = new HashMap();

    public static HashMap get_U() {
        return _U;
    }

    /**
     * 返回在线用户数量
     * @return
     */
    public static int size(){
        return get_U().size();
    }

    public static void set_U(HashMap _u) {
        _U = _u;
    }

    public void attributeAdded(HttpSessionBindingEvent event) {
        if(event.getName().equals("username")){
            _U.put(event.getValue(),new Timestamp(System.currentTimeMillis()));
        }
    }

    public void attributeRemoved(HttpSessionBindingEvent event) {
        if(event.getName().equals("username")){
            _U.remove(event.getValue());
        }
    }





    // -------------------------------------------------------
    // ServletContextListener implementation
    // -------------------------------------------------------
    public void contextInitialized(ServletContextEvent sce) {
      /* This method is called when the servlet context is
         initialized(when the Web application is deployed). 
         You can initialize servlet context related data here.
      */
    }

    public void contextDestroyed(ServletContextEvent sce) {
      /* This method is invoked when the Servlet Context 
         (the Web application) is undeployed or 
         Application Server shuts down.
      */
    }

    // -------------------------------------------------------
    // HttpSessionListener implementation
    // -------------------------------------------------------
    public void sessionCreated(HttpSessionEvent se) {
      /* Session is created. */
    }

    public void sessionDestroyed(HttpSessionEvent se) {
      /* Session is destroyed. */
    }

    // -------------------------------------------------------
    // HttpSessionAttributeListener implementation
    // -------------------------------------------------------

    public void attributeReplaced(HttpSessionBindingEvent sbe) {
      /* This method is invoked when an attibute
         is replaced in a session.
      */
    }
}
