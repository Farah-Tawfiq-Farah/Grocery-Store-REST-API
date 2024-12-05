const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const checkAuth = require('../middleware/check-auth');

const Product = require('../models/product')

// Handle GET requests to /products
router.get('/', (req, res, next) => {
    Product.find()
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

// Handle GET requests for a specific product ID
router.get('/:productId', (req, res, next) => {
    const productId = req.params.productId;
    Product.findById(productId)
    .exec()
    .then(doc => {
        console.log(doc);
        if (doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({
                message: "Couldn't find the product in the database"
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

// Handle POST requests to /products
router.post('/', checkAuth, (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        ProductCode: req.body.ProductCode,
        ProductName: req.body.ProductName,
        ProductQuantity: req.body.ProductQuantity,
        Product_price: req.body.Product_price
    });
    product.save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Product created Successfully',
            createdProduct: result
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

// Handle PUT requests for a specific product ID
router.put('/:productId', checkAuth, (req, res, next) => {
    const productId = req.params.productId;
    const updatedProduct = {
        ProductCode: req.body.ProductCode,
        ProductName: req.body.ProductName,
        ProductQuantity: req.body.ProductQuantity,
        Product_price: req.body.Product_price
    };
    Product.updateOne({ _id: productId }, { $set: updatedProduct })
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Product updated successfuly',
            result: result
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    });   
});

// Handle DELETE requests for a specific product ID
router.delete('/:productId', checkAuth, (req, res, next) => {
    const productId = req.params.productId;
    Product.deleteOne({_id: productId})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Product deleted successfuly',
            result: result
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

// Handle PATCH requests for a specific product ID
router.patch('/:productId', checkAuth, (req, res, next) => {
    const productId = req.params.productId;
    const updateOps = {};
    for (const key in req.body) {
        updateOps[key] = req.body[key];
    }
    Product.updateOne({_id: productId}, {$set: updateOps})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Product updated successfuly',
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
 * /products:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get all products
 *     responses:
 *       200:
 *         description: Successful operation
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Product'
 *   post:
 *     tags:
 *       - Products
 *     summary: Create a new product
 *     parameters:
 *       - in: body
 *         name: product
 *         schema:
 *           $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Product created
 *
 * /products/{productId}:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get a product by ID
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *         schema:
 *           $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *   put:
 *     tags:
 *       - Products
 *     summary: Update a product by ID
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         type: string
 *       - in: body
 *         name: product
 *         schema:
 *           $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product updated
 *   delete:
 *     tags:
 *       - Products
 *     summary: Delete a product by ID
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Product deleted
 */