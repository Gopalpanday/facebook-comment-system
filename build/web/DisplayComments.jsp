
<%@page import="java.util.Iterator"%>
<%@page import="java.util.List"%>
<%@page import="com.comment.Comment, com.comment.ConnectionDao" contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
        <script type="text/javascript" src="script/jquery-1.11.2.js"></script>
        <link rel="stylesheet" type="text/css" href="script/style.css" />
        <script type="text/javascript">
            $(document).ready(function () {
                $("table:even").css("background-color", "lightsalmon");
                $("table:odd").css("background-color", "lightblue");
            });
        </script>
    </head>
    <body>
        <h1><u>Comments</u></h1>
                <%
                    try {
                        ConnectionDao obj = new ConnectionDao();
                        List<Comment> coms = obj.listUser();
                        Iterator itr = coms.iterator();
                        while (itr.hasNext()) {
                            Comment c = (Comment) itr.next();
                %>
        <table id="tblComments">
            <tr>
                <td class="tblLabel">Name : </td>
                <td class="tblData"><%=c.getName()%></td>
            </tr>
            <tr>
                <td class="tblLabel">Comment : </td>
                <td class="tblData"><%=c.getComment()%></td>
            </tr>
        </table>
        <hr />

        <%                }
            } catch (Exception ex) {

            }
        %>
    </body>
</html>
