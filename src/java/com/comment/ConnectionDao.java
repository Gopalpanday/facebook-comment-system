package com.comment;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ConnectionDao {

    Connection con;
    Statement stmt;
    PreparedStatement pstmt;
    ResultSet rs;

    public ConnectionDao() throws Exception {
        Class.forName("com.mysql.jdbc.Driver");
        con = DriverManager.getConnection("jdbc:mysql://localhost/asp", "root", "");

    }

    public void addUser(String user, String comment) throws Exception {
        String sql = "INSERT INTO Comment(name, comment) VALUES (?, ?)";
        pstmt = con.prepareCall(sql);
        pstmt.setString(1, user);
        pstmt.setString(2, comment);
        pstmt.execute();
    }

    public List<Comment> listUser() throws Exception {
        String sql = "SELECT * FROM Comment ORDER BY ID DESC";
        stmt = con.createStatement();
        rs = stmt.executeQuery(sql);

        List<Comment> ls = new ArrayList<>();
        while (rs.next()) {
            Comment com = new Comment();
            com.setId(rs.getInt(1));
            com.setName(rs.getString(2));
            com.setComment(rs.getString(3));
            
            ls.add(com);
        }
        return ls;
    }
}
