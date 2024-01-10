"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomValidationError extends Error {
    // eslint-disable-next-line @typescript-eslint/space-before-function-paren
    constructor(statusCode, errors) {
        super('Validation Error');
        this.name = 'CustomValidationError';
        this.statusCode = statusCode;
        this.errors = errors.map((err) => {
            var _a, _b;
            return ({
                field: (_b = (_a = err.context) === null || _a === void 0 ? void 0 : _a.key) !== null && _b !== void 0 ? _b : 'unknown',
                message: err.message
            });
        });
    }
}
exports.default = CustomValidationError;
//# sourceMappingURL=validation.error.js.map