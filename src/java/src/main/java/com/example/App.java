package com.example;

import java.io.*;
import java.sql.*;
import java.security.MessageDigest;

public class App {
    // Hardcoded credentials
    private static final String DB_URL = "jdbc:mysql://localhost:3306/mydb";
    private static final String DB_USER = "root";
    private static final String DB_PASS = "admin123";

    // SQL Injection vulnerability
    public static String getUser(String userId) throws SQLException {
        Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASS);
        Statement stmt = conn.createStatement();
        ResultSet rs = stmt.executeQuery("SELECT * FROM users WHERE id = '" + userId + "'");
        return rs.getString("name");
    }

    // Command injection vulnerability
    public static void runCommand(String input) throws IOException {
        Runtime runtime = Runtime.getRuntime();
        runtime.exec("cmd /c " + input);
    }

    // Insecure random number generation
    public static int generateToken() {
        return new java.util.Random().nextInt();
    }

    // Weak cryptography
    public static String hashPassword(String password) throws Exception {
        MessageDigest md = MessageDigest.getInstance("MD5");
        byte[] digest = md.digest(password.getBytes());
        StringBuilder sb = new StringBuilder();
        for (byte b : digest) {
            sb.append(String.format("%02x", b));
        }
        return sb.toString();
    }

    // XXE vulnerability
    public static void parseXml(String xmlInput) throws Exception {
        javax.xml.parsers.DocumentBuilderFactory factory = 
            javax.xml.parsers.DocumentBuilderFactory.newInstance();
        javax.xml.parsers.DocumentBuilder builder = factory.newDocumentBuilder();
        builder.parse(new java.io.ByteArrayInputStream(xmlInput.getBytes()));
    }

    public static void main(String[] args) throws Exception {
        System.out.println("Code Scanning Test Java App");
        String user = getUser(args[0]);
        System.out.println("User: " + user);
    }
}
