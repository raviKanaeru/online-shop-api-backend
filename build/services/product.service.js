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
exports.deleteProductByIdFromDB = exports.updateProductByIdFromDB = exports.getProductByIdFromDB = exports.getProductsFromDB = exports.addProductToDB = void 0;
const product_model_1 = __importDefault(require("../models/product.model"));
const addProductToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.default
        .create(payload)
        .then((data) => {
        return data;
    })
        .catch((error) => {
        throw error;
    });
});
exports.addProductToDB = addProductToDB;
const getProductsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.default
        .find()
        .then((data) => {
        return data;
    })
        .catch((error) => {
        throw error;
    });
});
exports.getProductsFromDB = getProductsFromDB;
const getProductByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.default
        .findOne({ product_id: id })
        .then((data) => {
        return data;
    })
        .catch((error) => {
        throw error;
    });
});
exports.getProductByIdFromDB = getProductByIdFromDB;
const updateProductByIdFromDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.default.findOneAndUpdate({ product_id: id }, { $set: payload });
});
exports.updateProductByIdFromDB = updateProductByIdFromDB;
const deleteProductByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.default.findOneAndDelete({ product_id: id });
});
exports.deleteProductByIdFromDB = deleteProductByIdFromDB;
//# sourceMappingURL=product.service.js.map