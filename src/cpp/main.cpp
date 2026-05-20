#include <iostream>
#include <cstring>
#include <cstdlib>
#include <fstream>
#include <string>

// Hardcoded credentials
const char* API_KEY = "cpp-hardcoded-api-key-12345";
const char* DB_PASSWORD = "root_password_123";

// Buffer overflow vulnerability
void processInput(const char* input) {
    char buffer[64];
    strcpy(buffer, input);  // No bounds checking
    std::cout << "Processed: " << buffer << std::endl;
}

// Format string vulnerability
void logMessage(const char* userInput) {
    printf(userInput);  // Format string vulnerability
    printf("\n");
}

// Command injection vulnerability
void executeCommand(const std::string& cmd) {
    std::string fullCmd = "echo " + cmd;
    system(fullCmd.c_str());
}

// Use-after-free potential
int* createAndFree() {
    int* ptr = new int(42);
    delete ptr;
    return ptr;  // Returning dangling pointer
}

// Integer overflow
int multiply(int a, int b) {
    return a * b;  // No overflow check
}

// Path traversal
std::string readFile(const std::string& filename) {
    std::string path = "/data/" + filename;
    std::ifstream file(path);
    std::string content((std::istreambuf_iterator<char>(file)),
                         std::istreambuf_iterator<char>());
    return content;
}

int main(int argc, char* argv[]) {
    std::cout << "Code Scanning Test C++ App" << std::endl;
    if (argc > 1) {
        processInput(argv[1]);
        logMessage(argv[2]);
        executeCommand(argv[1]);
    }
    return 0;
}
