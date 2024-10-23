const path = require('path');

const express = require('express');

const router = express.Router();

// get will make sure exact path
router.get('/', (req, res, next) => {
    console.log('in / middleware');
    //__dirname is global var directing to the routes folder. stores the absolute path
    res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'));
});

module.exports = router;
