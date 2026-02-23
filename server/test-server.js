const http = require('http');
const fs = require('fs');

const logFile = 'server-test-result.txt';

const req = http.get('http://localhost:5000/api', (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
        fs.writeFileSync(logFile, JSON.stringify({ status: res.statusCode, body: data }, null, 2));
    });
});

req.on('error', (e) => {
    fs.writeFileSync(logFile, JSON.stringify({ error: e.message }, null, 2));
});

req.end();
