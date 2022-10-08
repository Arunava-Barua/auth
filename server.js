const express = require('express');
const path = require('path');
const https = require('https');
const fs = require('fs');
const helmet = require('helmet');

const PORT = 3000;

const app = express();

app.use(helmet());

app.get('/secret', (req, res) => {
    return res.send('Personal secret key is 42');
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

https.createServer({
    key: fs.readFileSync('key.pm'),
    cert: fs.readFileSync('cert.pem')
}, app).listen(PORT, () => {
    console.log('Listening on port ' + PORT);
});