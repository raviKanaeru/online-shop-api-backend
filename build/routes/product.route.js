"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRouter = void 0;
const express_1 = require("express");
const product_controller_1 = require("../controllers/product.controller");
exports.ProductRouter = (0, express_1.Router)();
exports.ProductRouter.get('/', product_controller_1.getAllProduct);
exports.ProductRouter.get('/:id', product_controller_1.getProductById);
exports.ProductRouter.post('/', product_controller_1.createProduct);
exports.ProductRouter.put('/:id', product_controller_1.updateProductById);
exports.ProductRouter.delete('/:id', product_controller_1.deleteProductById);
//# sourceMappingURL=product.route.js.map