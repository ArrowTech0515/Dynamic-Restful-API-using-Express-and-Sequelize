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
exports.validateSchema = void 0;
const asyncEndpoint_1 = __importDefault(require("./asyncEndpoint"));
const validateSchema = (...schemas) => {
    return (0, asyncEndpoint_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        for (let schemaItem of schemas) {
            const { schema, path } = schemaItem;
            // Cast `req[path]` to `any` to resolve TypeScript error
            let validation = schema.validate(req[path], { abortEarly: false });
            if (validation.error) {
                let messages = validation.error.details.map((i) => i.message);
                let errMessage = `Validation errors: ${messages.join(', ')}`;
                throw { status: 400, message: errMessage };
            }
        }
        next();
    }));
};
exports.validateSchema = validateSchema;
