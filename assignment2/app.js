const http = require('http');

const express = require('express');

const app = express();

// app.use('/', (req, res, next) => {
//     console.log('in first middleware');
//     //defaut response is text/html
//     next();
// });

// app.use('/', (req, res, next) => {
//     console.log('in another middleware');
//     //defaut response is text/html
//     res.send('<h1>hello from another middleware</h1>');
// });

app.use('/users', (req, res, next) => {
    console.log('in first middleware');
    //defaut response is text/html
    res.send(`
        <ul>
        <li>user 1</li>
        <li>user 2</li>
        </ul>
        `)
});

app.use('/', (req, res, next) => {
    console.log('in another middleware');
    //defaut response is text/html
    res.send('<h1>hello from middleware</h1>');
});

app.listen(3000);