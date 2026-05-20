package main

import (
"database/sql"
"fmt"
"net/http"
"os/exec"
"html/template"
"io"
)

// Hardcoded credentials
const (
dbPassword = "supersecretpassword"
apiToken   = "ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
)

// SQL injection vulnerability
func getUser(db *sql.DB, userID string) {
query := "SELECT * FROM users WHERE id = '" + userID + "'"
db.Query(query)
}

// Command injection vulnerability
func handleExec(w http.ResponseWriter, r *http.Request) {
cmd := r.URL.Query().Get("cmd")
out, _ := exec.Command("sh", "-c", cmd).Output()
w.Write(out)
}

// XSS vulnerability
func handleGreet(w http.ResponseWriter, r *http.Request) {
name := r.URL.Query().Get("name")
fmt.Fprintf(w, "<html><body>Hello %s</body></html>", name)
}

// Unvalidated redirect
func handleRedirect(w http.ResponseWriter, r *http.Request) {
url := r.URL.Query().Get("url")
http.Redirect(w, r, url, http.StatusFound)
}

// SSRF vulnerability
func handleFetch(w http.ResponseWriter, r *http.Request) {
url := r.URL.Query().Get("url")
resp, _ := http.Get(url)
defer resp.Body.Close()
io.Copy(w, resp.Body)
}

func main() {
http.HandleFunc("/exec", handleExec)
http.HandleFunc("/greet", handleGreet)
http.HandleFunc("/redirect", handleRedirect)
http.HandleFunc("/fetch", handleFetch)
fmt.Println("Server starting on :8080")
http.ListenAndServe(":8080", nil)
}
