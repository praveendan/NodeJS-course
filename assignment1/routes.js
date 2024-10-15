const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Enter user</title><head>');
        res.write(`
            <body>
                <form action="/create-user" method="POST">
                    <input type="text" name="username">
                    <button type="submit">Send</button>
                </form>
            </body>`);
        res.write('</html>');
        return res.end();
    }
    if (url === '/users') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>My First Assignment</title></head>');
        res.write(`
            <body
                <h1>Users</h1>
                <ul>
                    <li>User 1</li>
                    <li>User 2</li>
                </ul>
            </body>
        `)
        res.write('</html>');
        return res.end();
    }
    if (url === '/create-user' && method === 'POST') {
        const requestBodyDataChunks = [];
        req.on('data', chunk => {
            requestBodyDataChunks.push(chunk);
        });

        return req.on('end', _ => {
            const parsedBody = Buffer.concat(requestBodyDataChunks).toString();

            console.log('Submitted Data: ', parsedBody.split('=')[1])

            res.statusCode = 302;
            res.setHeader('Location', '/users');
            return res.end();
        });
    }
    else {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Enter user</title><head>');
        res.write(`
            <body>
                <h1>Page Not found</h1>
            </body>`);
        res.write('</html>');
        return res.end();
    }

}

exports.handler = requestHandler;
