
import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import { v4 as uuid } from 'uuid';

const app = express();
app.use(helmet());
app.use(express.json());

app.get('/', (_, res) => res.send());

app.use(errorHandler);

export { app };

function errorHandler(err: any, req: Request, res: Response, _: NextFunction) {
    let error = 'Unknown error.';
    if (err) {
        error = err?.stack || err.message || err;
    }

    const path = req.originalUrl;
    const method = req.method;
    const params = req.params;
    const body = req.body;
    const errorId = uuid();

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