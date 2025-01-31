const path = require('path');

const express = require('express');
// Parse incoming request bodies in a middleware before your handlers, available under the req.body property
const bodyParser = require('body-parser');
//handle mongo
const mongoose = require('mongoose');
//handle session
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
//handle csrf tokens
const csrf = require('csurf');
//handle server errors
const flash = require('connect-flash');

const errorController = require('./controllers/error');
const User = require('./models/user');

const MONGODB_URI =
  '';

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});
const csrfProtection = csrf();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
/*
secret: should be a long text
resave: false session will not be saved on every response but only something changes
saveUninitialized: no session will get saved when it does need to save
can set max age and stuff
*/
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);
app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

//added csrf middleware
app.use((req, res, next) => {
  // locals means local variables passed to views
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect(MONGODB_URI)
  .then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });