const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
// const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// save the user in one central place and access it anywhere
// app.use((req, res, next) => {
//   User.findById('677ac02855fef172f4e8839b')
//     .then(user => {
//       req.user = new User(user.name, user.email, user.cart, user._id);
//       next();
//     })
//     .catch(err => console.log(err));
// });

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    'mongodb+srv://praveendan:fW9WF1TbIMGZBKWQ@nodejs-course.27hsh.mongodb.net/mongoose_nodeJS_course?retryWrites=true&w=majority&appName=NodeJS-course'
  )
  .then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
//user name praveendan pw:fW9WF1TbIMGZBKWQ