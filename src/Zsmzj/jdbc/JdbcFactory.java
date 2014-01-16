package Zsmzj.jdbc;

import org.apache.log4j.Logger;

import java.sql.*;

/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-8
 * Time: 下午5:43
 * To change this template use File | Settings | File Templates.
 */
public class JdbcFactory {
    private static Connection conn = null;
    private static final Logger log = Logger.getLogger(JdbcFactory.class);

    public static Statement getStmt(Connection con) {
        try {
            return con.createStatement();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    public static PreparedStatement getPstmt(Connection con, String sql) {
        try {
            log.debug(sql);
            log.debug(con.isClosed());
            PreparedStatement pstmt = con.prepareStatement(sql);
            return pstmt;
        } catch (SQLException e) {
            log.debug(e.getMessage());
            e.printStackTrace();
        }
        return null;
    }

    public static  Connection getConn(String dbtype) {
        try {

            if(conn==null||conn.isClosed()){
                if(dbtype.equalsIgnoreCase("sqlite")){
                    SqliteSql db=new SqliteSql();
                    conn=db.getConn();
                    //conn.setAutoCommit(false);

                }
                else if(dbtype.equalsIgnoreCase("postgres")){
                    PostgreSql db = new PostgreSql();
                    conn = db.getConn();

                }
            }

        }catch (SQLException ex){

            log.debug(ex.getMessage());

        }
        return conn;



    }

    public static  void main(String[] args){
        Connection testConn=JdbcFactory.getConn("sqlite");
        PreparedStatement pstmt = JdbcFactory.getPstmt(testConn, "select count(*) from users");
        try {
        ResultSet rs = pstmt.executeQuery();
        while (rs.next()) {
            System.out.println(rs.getInt(1));
        }}catch (Exception E){
            log.debug(E.getMessage());
        }

        //System.out.println("hello");
        //log.debug("test");

    }

}
