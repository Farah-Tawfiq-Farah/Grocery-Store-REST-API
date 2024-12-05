const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    ProductCode: {type: Number, required: true, unique: true},
    ProductName: {type: String, required: true},
    ProductQuantity: {type: Number, required: true},
    Product_price: {type: Number, required: true}
});

module.exports = mongoose.model('Product', productSchema);