import express from 'express';
import bodyParser from 'body-parser';
import db from './db'; // Database setup
import customerRoutes from './routes/customers'; // Customer router

const app = express();

// Middleware
app.use(bodyParser.json());

// Attach the database to the request object
app.use((req, res, next) => {
  req.app.set('db', db);
  next();
});

// Routes
app.use('/api/v1/customers', customerRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
