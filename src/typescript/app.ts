import express, { Request, Response } from 'express';
import { exec } from 'child_process';
import * as fs from 'fs';

const app = express();
app.use(express.json());

// Hardcoded secrets
const JWT_SECRET: string = 'my-super-secret-jwt-key';
const ENCRYPTION_KEY: string = 'aes-256-key-hardcoded-here';

// Command injection
app.get('/execute', (req: Request, res: Response) => {
    const command: string = req.query.cmd as string;
    exec(command, (error, stdout, stderr) => {
        res.json({ output: stdout, error: stderr });
    });
});

// Path traversal
app.get('/download', (req: Request, res: Response) => {
    const filename: string = req.query.file as string;
    const content = fs.readFileSync('/data/' + filename, 'utf-8');
    res.send(content);
});

// Regex DoS (ReDoS) vulnerability
app.post('/validate-email', (req: Request, res: Response) => {
    const email: string = req.body.email;
    const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    const isValid = emailRegex.test(email);
    res.json({ valid: isValid });
});

// Unsafe eval
app.post('/calc', (req: Request, res: Response) => {
    const expression: string = req.body.expr;
    const result = eval(expression);
    res.json({ result });
});

// Type confusion / any abuse
function processData(data: any): string {
    return data.toString();
}

app.listen(4000, () => console.log('TypeScript app running on port 4000'));
