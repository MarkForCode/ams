import express from 'express';
import { query, validationResult } from 'express-validator';

export const encodeBase64 = (str: string) => {
    return Buffer.from(str).toString('base64');
};
export const decodeBase64 = (str: string) => {
    return Buffer.from(str, 'base64').toString();
};

/**
 * format error message
 *
 * @param err
 * @returns
 */
// err may not be standardd Error object
// eslint-disable-next-line
export function formatError(err: any) {
    return err?.stack || err?.message || err?.sql || err;
}

export const logFormatter = (msg: string, req: express.Request, apiStartTime = Date.now()) => {
    return {
        msg: msg,
        headers: req.headers,
        reqQuery: req.query,
        reqParams: req.params,
        reqBody: req.body,
        elapsed: Date.now() - apiStartTime,
    };
};

export function validatorErrorMiddler(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): void {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            status: 0,
            message: errors.array(),
        });
        return;
    }
    return next();
}

export function toStringSecure(field: any, defaultValue: string): string {
    return (field || defaultValue) + '';
}

export function toArraySecure(field: any) {
    if (Array.isArray(field)) {
        return field;
    }
    throw new Error(`field: ${field} is not a array`);
}

export const paginationValidator = [
    query('page')
        .default(0)
        .isInt({ min: 0, max: 50 })
        .toInt()
        .withMessage('page is optional and should be int between 0 and 50'),
];

export function getPagination(page: number, start?: Date, pageSize = 20) {
    const skip = pageSize * page || 0;
    const take = pageSize;

    return { options: { skip, take }, page: { pageSize, start } };
}

export function paginationMiddleware(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    const page = parseInt(toStringSecure(req.query.page, '0')) || 0;
    res.locals.page = Math.max(page, page - 1);
    next();
}
