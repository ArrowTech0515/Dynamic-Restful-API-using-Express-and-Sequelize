"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const db_1 = __importDefault(require("./db")); // Database setup
const customers_1 = __importDefault(require("./routes/customers")); // Customer router
const app = (0, express_1.default)();
// Middleware
app.use(body_parser_1.default.json());
// Attach the database to the request object
app.use((req, res, next) => {
    req.app.set('db', db_1.default);
    next();
});
// Routes
app.use('/api/v1/customers', customers_1.default);
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
