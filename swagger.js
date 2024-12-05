const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Grocery Store API',
      version: '1.0.0',
      description: 'API for managing products, orders, and employees in a grocery store',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    components: {
      schemas: {
        Product: {
          type: 'object',
          required: ['ProductCode', 'ProductName', 'ProductQuantity', 'Product_price'],
          properties: {
            _id: { type: 'string', example: '60c72b2f9b1d8a001c8e4a4e' },
            ProductCode: { type: 'integer', example: 1 },
            ProductName: { type: 'string', example: 'Edible oil' },
            ProductQuantity: { type: 'integer', example: 300 },
            Product_price: { type: 'integer', example: 90 },
          },
        },
        Order: {
          type: 'object',
          required: ['OrderNo', 'Order Date', 'Product Code', 'Product Name', 'Product Quantity', 'Product Price', 'Total', 'ModeOf Payment', 'CustNo'],
          properties: {
            _id: { type: 'string' },
            OrderNo: { type: 'integer' },
            "Order Date": { type: 'string' },
            "Product Code": { type: 'integer' },
            "Product Name": { type: 'string' },
            "Product Quantity": { type: 'integer' },
            "Product Price": { type: 'integer' },
            Total: { type: 'integer' },
            "ModeOf Payment": { type: 'string' },
            CustNo: { type: 'integer' },
          },
        },
        Employee: {
          type: 'object',
          required: ['Empid', 'Username', 'Password', 'Emp_photo'],
          properties: {
            _id: { type: 'string' },
            Empid: { type: 'integer' },
            Username: { type: 'string' },
            Password: { type: 'string' },
            Emp_photo: { type: 'string' },
          },
        },
      },
    },
  },
  apis: ['./api/routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerUi, swaggerDocs };