"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
const sequelizeRouter_1 = __importDefault(require("../middleware/sequelizeRouter"));
const createSchema = {
    path: 'body',
    schema: joi_1.default.object().keys({
        first_name: joi_1.default.string().required(),
        last_name: joi_1.default.string().required(),
    }),
};
const updateSchema = {
    path: 'body',
    schema: joi_1.default.object().keys({
        first_name: joi_1.default.string().required(),
        last_name: joi_1.default.string().required(),
    }),
};
const router = (0, sequelizeRouter_1.default)({
    model: 'Customers',
    schemas: { create: createSchema, update: updateSchema },
});
exports.default = router;
