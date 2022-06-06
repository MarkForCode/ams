"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationMiddleware = exports.getPagination = exports.paginationValidator = exports.toArraySecure = exports.toStringSecure = exports.validatorErrorMiddler = exports.logFormatter = exports.formatError = exports.decodeBase64 = exports.encodeBase64 = void 0;
const express_validator_1 = require("express-validator");
const encodeBase64 = (str) => {
    return Buffer.from(str).toString('base64');
};
exports.encodeBase64 = encodeBase64;
const decodeBase64 = (str) => {
    return Buffer.from(str, 'base64').toString();
};
exports.decodeBase64 = decodeBase64;
/**
 * format error message
 *
 * @param err
 * @returns
 */
// err may not be standardd Error object
// eslint-disable-next-line
function formatError(err) {
    return (err === null || err === void 0 ? void 0 : err.stack) || (err === null || err === void 0 ? void 0 : err.message) || (err === null || err === void 0 ? void 0 : err.sql) || err;
}
exports.formatError = formatError;
const logFormatter = (msg, req, apiStartTime = Date.now()) => {
    return {
        msg: msg,
        headers: req.headers,
        reqQuery: req.query,
        reqParams: req.params,
        reqBody: req.body,
        elapsed: Date.now() - apiStartTime,
    };
};
exports.logFormatter = logFormatter;
function validatorErrorMiddler(req, res, next) {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            status: 0,
            message: errors.array(),
        });
        return;
    }
    return next();
}
exports.validatorErrorMiddler = validatorErrorMiddler;
function toStringSecure(field, defaultValue) {
    return (field || defaultValue) + '';
}
exports.toStringSecure = toStringSecure;
function toArraySecure(field) {
    if (Array.isArray(field)) {
        return field;
    }
    throw new Error(`field: ${field} is not a array`);
}
exports.toArraySecure = toArraySecure;
exports.paginationValidator = [
    (0, express_validator_1.query)('page')
        .default(0)
        .isInt({ min: 0, max: 50 })
        .toInt()
        .withMessage('page is optional and should be int between 0 and 50'),
];
function getPagination(page, start, pageSize = 20) {
    const skip = pageSize * page || 0;
    const take = pageSize;
    return { options: { skip, take }, page: { pageSize, start } };
}
exports.getPagination = getPagination;
function paginationMiddleware(req, res, next) {
    const page = parseInt(toStringSecure(req.query.page, '0')) || 0;
    res.locals.page = Math.max(page, page - 1);
    next();
}
exports.paginationMiddleware = paginationMiddleware;
//# sourceMappingURL=index.js.map