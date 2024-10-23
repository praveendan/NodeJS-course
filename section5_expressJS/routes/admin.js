const express = require('express');

const bodyParser = require('body-parser');

const router = express.Router();


router.use(bodyParser.urlencoded({ extended: false }));

// if you are sending a res, that probably means you don't need to call next()
// order matters
router.get('/add-product', (req, res, next) => {
    console.log('in add product middleware');
    res.send('<form action="/admin/add-product" method="POST"><input type="text" name="title"/><button type="submit">add</button></form>');
});

router.post('/add-product', (req, res, _) => {
    console.log('in product middleware');
    //defaut response is text/html
    console.log(req.body)
    res.redirect('/');
});

module.exports = router;