import { Sequelize, DataTypes } from 'sequelize';
import CustomerModel from './models/Customer'; // Import the model

const sequelize = new Sequelize('db_restapi_demo', 'root', '', {
  host: 'localhost',
  dialect: 'mys', // or 'mysql', 'sqlite', etc.
});

// Define models
const Customer = CustomerModel(sequelize, DataTypes); // Pass DataTypes directly here

const db = {
  Customers: Customer,
  sequelize,
  Sequelize,
};

// Sync models to create tables in the database
db.sequelize.sync();

export default db;
