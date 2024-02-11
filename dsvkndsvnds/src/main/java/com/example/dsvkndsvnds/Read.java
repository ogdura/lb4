package com.example.dsvkndsvnds;

import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
@WebServlet(name = "read", value = "/read")
public class Read extends HttpServlet {
    private String message;

    public void init() {
        message = "Hello World!";
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("text/html");
        PrintWriter out = resp.getWriter();
        out.println("<html><body>");
        out.println("<h1>"+message+"</h1>");
        out.println("</body></html>");
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            // Загрузка драйвера JDBC и установка соединения с базой данных
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/teams", "root", "root");

            // Создание SQL-запроса для чтения данных команды
            String sql = "SELECT * FROM teams";
            PreparedStatement pstmt = conn.prepareStatement(sql);

            // Выполнение запроса и получение результатов
            ResultSet rs = pstmt.executeQuery();

            // Подготовка StringBuilder для формирования JSON
            StringBuilder str = new StringBuilder();
            str.append("[");

            // Чтение результатов запроса
            while (rs.next()) {
                str.append("{");
                str.append("\"name\":\"").append(rs.getString("name")).append("\",");
                str.append("\"champ\":").append(rs.getInt("cahmp")).append(",");
                str.append("\"lch\":").append(rs.getInt("lch")).append(",");
                str.append("\"year\":").append(rs.getInt("year")).append(",");
                str.append("\"country\":\"").append(rs.getString("country")).append("\",");
                str.append("\"id\":\"").append(rs.getString("id")).append("\"");
                str.append("},");
            }

            // Удаление последней запятой и добавление закрывающей скобки
            if (str.length() > 1) {
                str.deleteCharAt(str.length() - 1);
            }
            str.append("]");

            // Закрытие соединения
            conn.close();

            // Отправка JSON в ответ
            resp.setContentType("application/json");
            PrintWriter out = resp.getWriter();
            out.print(str.toString());
            out.flush();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }






    public void destroy() {
    }
}