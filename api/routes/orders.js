const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const checkAuth = require('../middleware/check-auth');

const Order = require('../models/order');

// Handle GET requests to /orders
router.get('/', checkAuth, (req, res, next) => {
    Order.find()
    .exec()
    .then( docs => {
        console.log(docs);
        if (docs.length >= 0){
            res.status(200).json(docs);
        } else {
            res.status(404).json({
                message: "No entries found"
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

// Handle GET requests for a specific order ID
router.get('/:orderId', checkAuth, (req, res, next) => {
    const orderId = req.params.orderId;
    Order.findById(orderId)
    .exec()
    .then(doc => {
        console.log(doc);
        if (doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({
                message: "Couldn't find the order in the database"
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

// Handle POST requests to /orders
router.post('/', checkAuth, (req, res, next) => {
    const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        "Order Date": req.body["Order Date"],
        "Product Code": req.body["Product Code"],
        "Product Name": req.body["Product Name"],
        "Product Quantity": req.body["Product Quantity"],
        "Product Price": req.body["Product Price"],
        Total: req.body.Total,
        "ModeOf Payment": req.body["ModeOf Payment"],
        OrderNo: req.body.OrderNo,
        CustNo: req.body.CustNo
    });
    order.save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Order created Successfully',
            createdOrder: result
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

// Handle PUT requests for a specific order ID
router.put('/:orderId', checkAuth, (req, res, next) => {
    const orderId = req.params.orderId;
    const updatedOrder = {
        "Order Date": req.body["Order Date"],
        "Product Code": req.body["Product Code"],
        "Product Name": req.body["Product Name"],
        "Product Quantity": req.body["Product Quantity"],
        "Product Price": req.body["Product Price"],
        Total: req.body.Total,
        "ModeOf Payment": req.body["ModeOf Payment"],
        OrderNo: req.body.OrderNo,
        CustNo: req.body.CustNo
    };
    Order.updateOne({ _id: orderId }, { $set: updatedOrder })
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Order updated successfuly',
            result: result
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    });  
});

// Handle DELETE requests for a specific order ID
router.delete('/:orderId', checkAuth, (req, res, next) => {
    const orderId = req.params.orderId;
    Order.deleteOne({_id: orderId})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Order deleted successfuly',
            result: result
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

// Handle PATCH requests for a specific order ID
router.patch('/:orderId', checkAuth, (req, res, next) => {
    const orderId = req.params.orderId;
    const updateOps = {};
    for (const key in req.body) {
        updateOps[key] = req.body[key];
    }
    Order.updateOne({_id: orderId}, {$set: updateOps})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Order updated successfuly',
            result: result
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});


module.exports = router;

/**
 * @swagger
 * /orders:
 *   get:
 *     tags:
 *       - Orders
 *     summary: Get all orders
 *     responses:
 *       200:
 *         description: Successful operation
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Order'
 *   post:
 *     tags:
 *       - Orders
 *     summary: Create a new order
 *     parameters:
 *       - name: order
 *         in: body
 *         schema:
 *           $ref: '#/definitions/Order'
 *     responses:
 *       201:
 *         description: Order created
 *
 * /orders/{orderId}:
 *   get:
 *     tags:
 *       - Orders
 *     summary: Get an order by ID
 *     parameters:
 *       - name: orderId
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *         schema:
 *           $ref: '#/definitions/Order'
 *       404:
 *         description: Order not found
 *   put:
 *     tags:
 *       - Orders
 *     summary: Update an order by ID
 *     parameters:
 *       - name: orderId
 *         in: path
 *         required: true
 *         type: string
 *       - name: order
 *         in: body
 *         schema:
 *           $ref: '#/definitions/Order'
 *     responses:
 *       200:
 *         description: Order updated
 *   delete:
 *     tags:
 *       - Orders
 *     summary: Delete an order by ID
 *     parameters:
 *       - name: orderId
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Order deleted
 *   patch:
 *     tags:
 *       - Orders
 *     summary: Update a part of an order by ID
 *     parameters:
 *       - name: orderId
 *         in: path
 *         required: true
 *         type: string
 *       - name: order
 *         in: body
 *         schema:
 *           $ref: '#/definitions/Order'
 *     responses:
 *       200:
 *         description: Order partially updated
 */