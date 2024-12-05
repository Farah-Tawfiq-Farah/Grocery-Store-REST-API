const http = require('http'); // Import the http module
const app = require('./app'); // Import the Express app from app.js

// Define the port to run the server on, using the environment variable PORT if available
const port = process.env.PORT || 3000;

// Create an HTTP server that uses the Express app to handle requests
const server = http.createServer(app);

// Make the server listen on the specified port
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
