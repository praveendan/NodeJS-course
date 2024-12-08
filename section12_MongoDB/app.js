const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

// User created Prods
Product.belongsTo(User, {
    constraints: true,
    onDelete: 'CASCADE'
})
User.hasMany(Product);
//user has one cart
User.hasOne(Cart);
Cart.belongsTo(User); // optional
// product can be in many carts and cart can contain many products
// through will specify how this relationship is created (through which table)
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

//order has one user
//user can have many orders
//order and products are connected through orderItems table
//order can have many products and a product can belong to many orders
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Set the user and keep it throughout the app
app.use((req, res, next) => {
    User
        .findByPk(1)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

sequelize
    .sync()
    //.sync({ force: true }) // force: true forces the changes Do not do in Prod.!
    .then(result => {
        // console.log(result);
        return User.findByPk(1)

    })
    .then(user => {
        if (!user) {
            return User.create({ id: 1, name: 'Sam', email: 'sam@mas.sam' })
        }
        return user
    })
    .then(user => {
        return user.createCart()
    })
    .then(_ => {
        app.listen(3000);
    })
    .catch(err => console.log(err));


