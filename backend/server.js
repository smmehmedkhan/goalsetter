// Required Default dependencies
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
// Required Internal files
const goalRoutes = require('./routes/goalRoutes.js');
const { errorHandler } = require('./middlewares/errorHandler.js');
const connectToDb = require('./config/db.js');

const port = process.env.PORT || 8080;

connectToDb();

const app = express();

// Setup neccessary middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes paths
app.use('/api/goals', goalRoutes);

// Error handler
app.use(errorHandler);

// Start listening
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
