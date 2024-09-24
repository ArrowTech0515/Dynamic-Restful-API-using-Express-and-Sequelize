"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Customer_1 = __importDefault(require("./models/Customer")); // Import the model
const sequelize = new sequelize_1.Sequelize('db_restapi_demo', 'root', '', {
    host: 'localhost',
    dialect: 'mysql', // or 'mysql', 'sqlite', etc.
});
// Define models
const Customer = (0, Customer_1.default)(sequelize, sequelize_1.DataTypes); // Pass DataTypes directly here
const db = {
    Customers: Customer,
    sequelize,
    Sequelize: sequelize_1.Sequelize,
};
// Sync models to create tables in the database
db.sequelize.sync();
exports.default = db;
