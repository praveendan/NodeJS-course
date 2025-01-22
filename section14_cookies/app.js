const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

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
  session({ secret: 'my secret', resave: false, saveUninitialized: false })
);

app.use((req, res, next) => {
  // save the user in one central place and access it anywhere
  User.findById('67873dbd94ccb92557ffd3de')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    'mongodb+srv://praveendan:fW9WF1TbIMGZBKWQ@nodejs-course.27hsh.mongodb.net/mongoose_nodeJS_course?retryWrites=true&w=majority&appName=NodeJS-course'
  )
  .then(result => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'sam',
          email: 'sam@test.com',
          cart: {
            items: []
          }
        });
        user.save();
      }
    });
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
//user name praveendan pw:fW9WF1TbIMGZBKWQ