import os
import subprocess
import pickle
import hashlib
from flask import Flask, request, render_template_string

app = Flask(__name__)

# SQL Injection vulnerability
@app.route('/user')
def get_user():
    user_id = request.args.get('id')
    query = f"SELECT * FROM users WHERE id = {user_id}"
    return query

# Command injection vulnerability
@app.route('/ping')
def ping():
    host = request.args.get('host')
    result = os.system(f"ping -c 1 {host}")
    return str(result)

# Insecure deserialization
@app.route('/load', methods=['POST'])
def load_data():
    data = request.get_data()
    obj = pickle.loads(data)
    return str(obj)

# Weak hashing
def hash_password(password):
    return hashlib.md5(password.encode()).hexdigest()

# Hardcoded secret
SECRET_KEY = "super-secret-key-do-not-share"
DATABASE_PASSWORD = "admin123"

# SSTI vulnerability
@app.route('/template')
def template():
    name = request.args.get('name', 'World')
    template = f"Hello {name}!"
    return render_template_string(template)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
