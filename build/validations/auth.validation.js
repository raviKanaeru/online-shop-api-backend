"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSessionValidation = exports.createUserValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const createUserValidation = (payload) => {
    const schema = joi_1.default.object({
        user_id: joi_1.default.string().required(),
        name: joi_1.default.string().required(),
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().required(),
        role: joi_1.default.string().allow('', null)
    });
    return schema.validate(payload, { abortEarly: false });
};
exports.createUserValidation = createUserValidation;
const createSessionValidation = (payload) => {
    const schema = joi_1.default.object({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().required()
    });
    return schema.validate(payload, { abortEarly: false });
};
exports.createSessionValidation = createSessionValidation;
//# sourceMappingURL=auth.validation.js.map