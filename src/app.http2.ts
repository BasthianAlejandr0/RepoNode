import http2 from 'http2';
import fs from 'fs';
import path from 'path';


// Create a local server to receive data from
const keyPath = path.join(__dirname, '../keys/server.key');
const certPath = path.join(__dirname, '../keys/server.crt');
const server = http2.createSecureServer( {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath),

}, (req, res) => {
    if(req.url === '/'){
        const htmlFile= fs.readFileSync('./public/index.html', 'utf-8')
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(htmlFile);
        return;
    }

    if (req.url?.endsWith('.js')) {
        res.writeHead(200, { 'Content-Type': 'application/javascript' })
    } else if (req.url?.endsWith('.css')) {
        res.writeHead(200, { 'Content-Type': 'text/css' })
    }
    try{
        const responseContent = fs.readFileSync(`./public${req.url}`, 'utf-8')
        res.end(responseContent);
    }catch (error) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end();
    }
});

server.listen(8080, () => {
    console.log('Server running in port 8080')
})