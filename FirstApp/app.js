const http = require('http');
const fs = require('fs');


const server = http.createServer((req, res) => {
    const url = req.url
    const method = req.method;


    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter Message</title><head>');
        res.write(`
            <body>
                <form action="/message" method="POST">
                    <input type="text" name="messageForServer">
                    <button type="submit">Send</button>
                </form>
            </body>`);
        res.write('</html>');
        return res.end();
    }
    if (url === '/message' && method === 'POST') {
        const body = []; //req body
        // when a new chunk is read, this gets triggered
        req.on('data', (chunk) => {
            console.log('chunk', chunk)
            body.push(chunk);
        });
        return req.on('end', () => {
            // Buffer : NodeJS global thing
            const parsedBody = Buffer.concat(body).toString(); //out req contains text
            console.log('parsedBody', parsedBody)
            const message = parsedBody.split('=')[1];

            /*
            // writeFile
            */
            fs.writeFileSync('message.txt', message); // blocking execution
            res.statusCode = 302; // redirect
            res.setHeader('Location', '/');
            return res.end();
        })
    }
    console.log(req.url, req.method, req.headers);
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body<h1>Hi</h1></body>')
    res.write('</html>');
    res.end();
});

server.listen(3000);