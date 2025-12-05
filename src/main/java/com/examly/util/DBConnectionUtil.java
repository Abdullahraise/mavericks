package com.examly.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBConnectionUtil {

    private static final String URL = "jdbc:mysql://127.0.0.1:3306/appdb";
    private static final String USERNAME = "root";
    private static final String PASSWORD = "examly";

    public static Connection getConnection() {
        Connection connection = null;
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            connection = DriverManager.getConnection(URL, USERNAME, PASSWORD);
        } catch (ClassNotFoundException e) {
            System.out.println("MySQL Driver not found: " + e.getMessage());
        } catch (SQLException e) {
            System.out.println("Database Connection failed: " + e.getMessage());
        }
        return connection;
    }
}
