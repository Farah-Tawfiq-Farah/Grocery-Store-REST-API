const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    "Order Date": { type: String, required: true },
    "Product Code": { type: Number, required: true },
    "Product Name": { type: String, required: true },
    "Product Quantity": { type: Number, required: true },
    "Product Price": { type: Number, required: true },
    Total: { type: Number, required: true },
    "ModeOf Payment": { type: String, required: true },
    OrderNo: { type: Number, required: true, unique: true },
    CustNo: { type: Number, required: true }
});

module.exports = mongoose.model('Order', orderSchema);