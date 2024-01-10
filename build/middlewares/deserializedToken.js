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
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const jwt_1 = require("../utils/jwt");
const deserializedUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const accessToken = (_b = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace(/^Bearer\s/, '')) !== null && _b !== void 0 ? _b : '';
    if (!accessToken) {
        next();
    }
    const { decoded, expired } = (0, jwt_1.verifyJWT)(accessToken);
    if (decoded) {
        res.locals.user = jsonwebtoken_1.decode;
        next();
    }
    if (expired) {
        next();
    }
    next();
});
exports.default = deserializedUser;
//# sourceMappingURL=deserializedToken.js.map