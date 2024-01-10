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
exports.createSession = exports.registerUser = void 0;
const auth_validation_1 = require("../validations/auth.validation");
const uuid_1 = require("uuid");
const validation_error_1 = __importDefault(require("../errors/validation.error"));
const auth_service_1 = require("../services/auth.service");
const hashing_1 = require("../utils/hashing");
const jwt_1 = require("../utils/jwt");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = (0, uuid_1.v4)();
        const { error, value } = (0, auth_validation_1.createUserValidation)(Object.assign(Object.assign({}, req.body), { user_id: userId }));
        if (error) {
            throw new validation_error_1.default(422, error.details);
        }
        value.password = (0, hashing_1.hashing)(value.password);
        yield (0, auth_service_1.createUser)(value);
        return res.status(201).json({ status: true, statusCode: 201, message: 'Success register user' });
    }
    catch (error) {
        if (error instanceof validation_error_1.default) {
            return res
                .status(error.statusCode)
                .json({ status: false, statusCode: error.statusCode, message: 'Validation Error', errors: error.errors });
        }
        if (error.code === 11000 && error.keyPattern && error.keyValue) {
            return res.status(422).json({
                status: false,
                statusCode: 422,
                message: 'Validation Error',
                errors: [{ field: 'email', message: 'Email is already in use' }]
            });
        }
        return res.status(500).json({ status: false, statusCode: 500, message: error.message });
    }
});
exports.registerUser = registerUser;
const createSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, value } = (0, auth_validation_1.createSessionValidation)(req.body);
        if (error) {
            throw new validation_error_1.default(422, error.details);
        }
        const user = yield (0, auth_service_1.findUserByEmail)(value.email);
        const isValid = (0, hashing_1.checkPassword)(value.password, user.password);
        if (!isValid)
            return res.status(401).json({ status: false, statusCode: 401, message: 'Invalid email or password' });
        const accessToken = (0, jwt_1.signJWT)(Object.assign({}, user), { expiresIn: '1d' });
        return res.status(200).json({ status: true, statusCode: 200, message: 'Login success', data: { accessToken } });
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
exports.createSession = createSession;
//# sourceMappingURL=auth.controller.js.map