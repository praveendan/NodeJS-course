const express = require('express');

const router = express.Router();

// get will make sure exact path
router.get('/', (req, res, next) => {
    console.log('in / middleware');
    //defaut response is text/html
    res.send('<h1>hello from the other side</h1>');
});

module.exports = router;
