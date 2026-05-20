use std::process::Command;
use std::io::{self, BufRead};
use std::fs;

// Hardcoded credentials
const API_KEY: &str = "rust-secret-api-key-xxxxx";
const DB_CONNECTION: &str = "postgres://admin:password123@localhost/mydb";

fn execute_command(input: &str) -> String {
    // Command injection vulnerability
    let output = Command::new("sh")
        .arg("-c")
        .arg(input)
        .output()
        .expect("Failed to execute");
    String::from_utf8_lossy(&output.stdout).to_string()
}

fn read_file(filename: &str) -> String {
    // Path traversal vulnerability
    let path = format!("/data/{}", filename);
    fs::read_to_string(path).unwrap_or_default()
}

fn unsafe_parse(input: &str) -> i32 {
    // Unwrap without error handling
    input.parse::<i32>().unwrap()
}

fn main() {
    println!("Code Scanning Test Rust App");
    let stdin = io::stdin();
    for line in stdin.lock().lines() {
        let input = line.unwrap();
        println!("Command output: {}", execute_command(&input));
    }
}
