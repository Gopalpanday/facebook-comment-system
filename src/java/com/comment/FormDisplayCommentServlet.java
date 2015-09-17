package com.comment;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Iterator;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class FormDisplayCommentServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        try {
            ConnectionDao obj = new ConnectionDao();
            
            List<Comment> coms = obj.listUser();
            Iterator itr = coms.iterator();
            
            while(itr.hasNext()){
                Comment c = (Comment) itr.next();
                out.println(c.getComment() + "<br />" + c.getName() + "<br />");
            }
        } catch (Exception ex) {

        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        doGet(request, response);
    }
}
