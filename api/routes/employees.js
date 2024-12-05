const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const Employee = require('../models/employee');
const employee = require('../models/employee');

router.post('/signup', (req, res, next) => {
    Employee.find({ Username: req.body.Username })
    .exec()
    .then( employee => {
        if(employee.length >= 1){
            return res.status(409).json({
                message: "Employee username exists"
            });
        } else {
            const employee = new Employee({
                _id: new mongoose.Types.ObjectId(),
                Empid: req.body.Empid,
                Username: req.body.Username,
                Password: req.body.Password,
                Emp_photo: req.body.Emp_photo
            });
            employee.save()
            .then(result => {
                console.log(result);
                res.status(201).json({
                    message: 'Employee created Successfully',
                    createdProduct: result
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({error: err});
            });
        }
    }); 
});

router.post('/login', (req, res, next) => {
    Employee.find({Username: req.body.Username})
    .exec()
    .then(employee => {
        if(employee.length < 1){
            return res.status(401).json({
                message: 'Auth failed, wrong username'
            });
        }
        if(req.body.Password === employee[0].Password) {
            const token = jwt.sign({
                Username: employee[0].Username,
                EmployeeId : employee[0]._id
            }, process.env.JWT_KEY,
        {
            expiresIn: '1h'
        });
            return res.status(200).json({
                message: 'Auth successful',
                token: token
            });
        } else {
            return res.status(401).json({
                message: 'Auth failed wrong password'
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
})

router.delete('/employeeId', (req, res, next) => {
    Employee.deleteOne({_id: req.params.employeeId})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Employee deleted successfuly',
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
 * /employees/signup:
 *   post:
 *     tags:
 *       - Employees
 *     summary: Create a new employee (signup)
 *     parameters:
 *       - name: employee
 *         in: body
 *         schema:
 *           $ref: '#/definitions/Employee'
 *     responses:
 *       201:
 *         description: Employee created
 *       409:
 *         description: Employee username exists
 *
 * /employees/login:
 *   post:
 *     tags:
 *       - Employees
 *     summary: Login an employee
 *     parameters:
 *       - name: employee
 *         in: body
 *         schema:
 *           $ref: '#/definitions/Employee'
 *     responses:
 *       200:
 *         description: Auth successful
 *       401:
 *         description: Auth failed
 *
 * /employees/{employeeId}:
 *   delete:
 *     tags:
 *       - Employees
 *     summary: Delete an employee by ID
 *     parameters:
 *       - name: employeeId
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Employee deleted
 */