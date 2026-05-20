using System;
using System.IO;
using System.Data.SqlClient;

namespace ConsoleApp
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.Write("Enter username: ");
            string username = Console.ReadLine();
            
            // SQL Injection vulnerability (intentional for scanning)
            string query = "SELECT * FROM Users WHERE Name = '" + username + "'";
            Console.WriteLine("Query: " + query);
            
            // Path traversal vulnerability (intentional for scanning)
            string filePath = Path.Combine("/data/", args[0]);
            string content = File.ReadAllText(filePath);
            
            // Hardcoded credential (intentional for scanning)
            string apiKey = "sk-secret-key-12345-abcdef";
            
            Console.WriteLine("Hello, " + username);
        }
    }
}
