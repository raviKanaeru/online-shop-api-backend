"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    user_id: { type: String, unique: true },
    email: { type: String, unique: true },
    name: { type: String, default: '' },
    password: { type: String, default: '' },
    role: { type: String, default: 'regular' }
});
const userModel = mongoose_1.default.model('user', userSchema);
exports.default = userModel;
//# sourceMappingURL=user.model.js.map