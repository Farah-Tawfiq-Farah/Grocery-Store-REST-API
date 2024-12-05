const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Empid: {type: Number, required: true, unique: true},
    Username: {type: String, required: true, unique: true},
    Password: {type: String, required: true},
    Emp_photo: {type: String, required: true}
});

module.exports = mongoose.model('Employee', employeeSchema);