"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sequelize_1 = require("./sequelize");
const validateSchema_1 = require("./validateSchema");
const sequelizeRouter = (props) => {
    const { model, key = 'id', schemas } = props;
    const router = express_1.default.Router();
    router.get('/', (0, sequelize_1.read)({ model }));
    router.get(`/:${model}Id`, (0, sequelize_1.findByPk)({ model, id: `${model}Id` }));
    router.post('/', (0, validateSchema_1.validateSchema)(schemas.create), (0, sequelize_1.create)({ model }));
    router.put(`/:${key}`, (0, validateSchema_1.validateSchema)(schemas.update), (0, sequelize_1.update)({
        model,
        key,
        path: `params.${model}Id`,
    }));
    router.delete(`/:${key}`, (0, sequelize_1.destroy)({
        model,
        key,
        path: `params.${model}Id`,
    }));
    return router;
};
exports.default = sequelizeRouter;
