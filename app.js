const express = require('express'); // Import the express module
const app = express(); // Create an instance of an Express application
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const { swaggerUi, swaggerDocs } = require('./swagger');

// Middleware to parse JSON
app.use(express.json());


const productsRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');
const employeesRoutes = require('./api/routes/employees');

mongoose.connect('mongodb+srv://Far*****:' + process.env.MONGO_PASS + '@cluster0.tt9cayv.mongodb.net/grocerydb');
mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUt, PATCH, DELETE');
        return res.status(200).json({});
    }
    next();
});

// Swagger documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware function that handles all incoming requests
app.use('/products', productsRoutes);
app.use('/orders', ordersRoutes);
app.use('/employees', employeesRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

// Export the app module so it can be used in other files
module.exports = app;

