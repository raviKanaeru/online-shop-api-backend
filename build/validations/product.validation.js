"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductValidation = exports.createProductValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const createProductValidation = (payload) => {
    const schema = joi_1.default.object({
        product_id: joi_1.default.string().required(),
        name: joi_1.default.string().required(),
        price: joi_1.default.number().allow('', null),
        size: joi_1.default.string().required()
    });
    return schema.validate(payload, { abortEarly: false });
};
exports.createProductValidation = createProductValidation;
const updateProductValidation = (payload) => {
    const schema = joi_1.default.object({
        name: joi_1.default.string().allow('', null),
        price: joi_1.default.number().allow('', null),
        size: joi_1.default.string().allow('', null)
    });
    return schema.validate(payload, { abortEarly: false });
};
exports.updateProductValidation = updateProductValidation;
//# sourceMappingURL=product.validation.js.map