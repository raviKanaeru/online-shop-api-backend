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
exports.deleteProductById = exports.updateProductById = exports.getProductById = exports.getAllProduct = exports.createProduct = void 0;
const product_validation_1 = require("../validations/product.validation");
const product_service_1 = require("../services/product.service");
const uuid_1 = require("uuid");
const validation_error_1 = __importDefault(require("../errors/validation.error"));
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = (0, uuid_1.v4)();
        const { error, value } = (0, product_validation_1.createProductValidation)(Object.assign(Object.assign({}, req.body), { product_id: productId }));
        if (error) {
            throw new validation_error_1.default(422, error.details);
        }
        yield (0, product_service_1.addProductToDB)(value);
        return res.status(201).json({ status: true, statusCode: 201, message: 'Add product success' });
    }
    catch (error) {
        if (error instanceof validation_error_1.default) {
            return res
                .status(error.statusCode)
                .json({ status: false, statusCode: error.statusCode, message: 'Validation Error', errors: error.errors });
        }
        return res.status(500).json({ status: false, statusCode: 500, message: error.message });
    }
});
exports.createProduct = createProduct;
const getAllProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
        const products = yield (0, product_service_1.getProductsFromDB)();
        return res.status(200).json({ status: true, statusCode: 200, data: products });
    }
    catch (error) {
        return res.status(500).json({ status: false, statusCode: 500, message: error.message });
    }
});
exports.getAllProduct = getAllProduct;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { id } } = req;
        const product = yield (0, product_service_1.getProductByIdFromDB)(id);
        if (!product) {
            return res.status(404).json({ status: false, statusCode: 404, message: 'Data not found', data: {} });
        }
        return res.status(200).json({ status: true, statusCode: 200, data: product });
    }
    catch (error) {
        return res.status(500).json({ status: false, statusCode: 500, message: error.message });
    }
});
exports.getProductById = getProductById;
const updateProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { id } } = req;
        const { error, value } = (0, product_validation_1.updateProductValidation)(req.body);
        if (error) {
            throw new validation_error_1.default(422, error.details);
        }
        const product = yield (0, product_service_1.updateProductByIdFromDB)(id, value);
        if (!product) {
            return res.status(404).json({ status: false, statusCode: 404, message: 'Data not found', data: {} });
        }
        return res.status(200).json({ status: true, statusCode: 200, message: 'Update product success' });
    }
    catch (error) {
        if (error instanceof validation_error_1.default) {
            return res
                .status(error.statusCode)
                .json({ status: false, statusCode: error.statusCode, message: 'Validation Error', errors: error.errors });
        }
        return res.status(500).json({ status: false, statusCode: 500, message: error.message });
    }
});
exports.updateProductById = updateProductById;
const deleteProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { params: { id } } = req;
    try {
        const product = yield (0, product_service_1.deleteProductByIdFromDB)(id);
        if (!product) {
            return res.status(404).json({ status: false, statusCode: 404, message: 'Data not found', data: {} });
        }
        return res.status(200).json({ status: true, statusCode: 200, message: 'Delete product to success' });
    }
    catch (error) {
        return res.status(500).json({ status: false, statusCode: 500, message: error.message });
    }
});
exports.deleteProductById = deleteProductById;
//# sourceMappingURL=product.controller.js.map