"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const uuid_1 = require("uuid");
const app = (0, express_1.default)();
exports.app = app;
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.get('/', (_, res) => res.send());
app.use(errorHandler);
function errorHandler(err, req, res, _) {
    let error = 'Unknown error.';
    if (err) {
        error = (err === null || err === void 0 ? void 0 : err.stack) || err.message || err;
    }
    const path = req.originalUrl;
    const method = req.method;
    const params = req.params;
    const body = req.body;
    const errorId = (0, uuid_1.v4)();
    console.error('Error in controller.', {
        errorId,
        path,
        method,
        params,
        body,
        err: error,
    });
    return res.status(err.status || 500).json({
        status: 0,
        message: {
            errorId,
            path,
            method,
            params,
            body,
        },
    });
}
//# sourceMappingURL=app.js.map