"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.destroy = exports.update = exports.findByPk = exports.read = exports.create = void 0;
const asyncEndpoint_1 = __importDefault(require("./asyncEndpoint"));
const create = (props) => {
    const route = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const db = req.app.get('db');
        const model = db[props.model];
        if (!model)
            throw { status: 404, message: 'Model not found' };
        const results = yield model.create(req.body);
        req.results = results;
        next();
    });
    return [(0, asyncEndpoint_1.default)(route), (req, res) => res.json(req.results)];
};
exports.create = create;
const read = (props) => {
    const route = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const db = req.app.get('db');
        const model = db[props.model];
        if (!model)
            throw { status: 404, message: 'Model not found' };
        const results = yield model.findAll();
        req.results = results;
        next();
    });
    return [(0, asyncEndpoint_1.default)(route), (req, res) => res.json(req.results)];
};
exports.read = read;
const findByPk = (props) => {
    const route = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const db = req.app.get('db');
        const model = db[props.model];
        if (!model) {
            throw { status: 404, message: 'Model not found' };
        }
        const id = req.params[props.id]; // Extract ID from params
        // Check if ID is valid
        if (!id) {
            throw { status: 400, message: 'Invalid ID provided' };
        }
        const result = yield model.findByPk(id);
        // If no customer found, throw 404 error
        if (!result) {
            return res.status(404).json({ message: `Customer with id ${id} not found` });
        }
        req.results = result;
        next();
    });
    return [(0, asyncEndpoint_1.default)(route), (req, res) => res.json(req.results)];
};
exports.findByPk = findByPk;
const update = (props) => {
    const route = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const db = req.app.get('db');
        const model = db[props.model];
        if (!model) {
            throw { status: 404, message: 'Model not found' };
        }
        const id = req.params[props.key]; // Extract ID from the request params
        console.log(123, props, req.params);
        // Validate the ID
        if (!id) {
            return res.status(400).json({ message: 'Invalid ID provided' });
        }
        // Perform the update
        const [updatedRowCount] = yield model.update(req.body, {
            where: { id },
        });
        // If no rows were updated, the customer was not found
        if (updatedRowCount === 0) {
            return res.status(404).json({ message: `Customer with id ${id} not found` });
        }
        req.results = { message: `Customer with id ${id} updated successfully` };
        next();
    });
    return [(0, asyncEndpoint_1.default)(route), (req, res) => res.json(req.results)];
};
exports.update = update;
const destroy = (props) => {
    const route = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const db = req.app.get('db');
        const model = db[props.model];
        if (!model) {
            throw { status: 404, message: 'Model not found' };
        }
        const id = req.params[props.key]; // Extract ID from request params
        // Validate the ID
        if (!id) {
            return res.status(400).json({ message: 'Invalid ID provided' });
        }
        // Perform the delete operation
        const deletedRowCount = yield model.destroy({
            where: { id },
        });
        // If no rows were deleted, the customer was not found
        if (deletedRowCount === 0) {
            return res.status(404).json({ message: `Customer with id ${id} not found` });
        }
        req.results = { message: `Customer with id ${id} deleted successfully` };
        next();
    });
    return [(0, asyncEndpoint_1.default)(route), (req, res) => res.json(req.results)];
};
exports.destroy = destroy;
