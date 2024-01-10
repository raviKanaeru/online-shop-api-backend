"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const CONFIG = {
    db: process.env.DB,
    jwt_public: `${process.env.JWT_PUBLIC_KEY}`,
    jwt_private: `${process.env.JWT_PRIVATE_KEY}`
};
exports.default = CONFIG;
//# sourceMappingURL=environment.js.map