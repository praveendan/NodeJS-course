const path = require('path')

const express = require('express');

const rootDir = require('../util/path');

const bodyParser = require('body-parser');

const router = express.Router();


router.use(bodyParser.urlencoded({ extended: false }));

// if you are sending a res, that probably means you don't need to call next()
// order matters
router.get('/add-product', (req, res, next) => {
    console.log('in add product middleware');
    //__dirname is global var directing to the routes folder. stores the absolute path
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
});

router.post('/add-product', (req, res, _) => {
    console.log('in product middleware');
    //defaut response is text/html
    console.log(req.body)
    res.redirect('/');
});

module.exports = router;