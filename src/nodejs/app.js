const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

// Command injection vulnerability
app.get('/run', (req, res) => {
    const cmd = req.query.cmd;
    exec(cmd, (error, stdout) => {
        res.send(stdout);
    });
});

// Path traversal vulnerability
app.get('/file', (req, res) => {
    const fileName = req.query.name;
    const filePath = path.join('/uploads/', fileName);
    res.sendFile(filePath);
});

// Prototype pollution vulnerability
app.post('/merge', (req, res) => {
    const target = {};
    const source = req.body;
    for (const key in source) {
        target[key] = source[key];
    }
    res.json(target);
});

// XSS vulnerability
app.get('/search', (req, res) => {
    const q = req.query.q;
    res.send('<html><body>Results for: ' + q + '</body></html>');
});

// Hardcoded credentials
const DB_PASSWORD = 'password123';
const API_SECRET = 'mysecretapikey2024';

app.listen(3000, () => console.log('Server running on port 3000'));
