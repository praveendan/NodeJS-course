const path = require('path')

const express = require('express');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

// set will set any value globally within the app
// setting the default templating engine
app.set('view engine', 'pug');
// where to find the templates (this is default val so not necessary to set views folder explicitly)
app.set('views', 'views');

//opening public folder to the public to access (read only)
//if anyone tries to access static files (css, js) they will get the data from public folder
app.use(express.static(path.join(__dirname, 'public')));

// routes starting with admin goes here
//app.use() will respond to any path that starts with /admin
app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).render('404', { pageTitle: 'Page Not Found' });
});

app.listen(3000);