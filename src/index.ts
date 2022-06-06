
import path from 'path';
import Dotenv from 'dotenv';
const configPath = path.join(__dirname, `../.env.${process.env.NODE_ENV}`);
console.log(`use config: ${configPath}`);
Dotenv.config({ path: configPath, debug: true });

import http from 'http';

import { app } from './app';
import { formatError } from './utils';

const PORT = process.env.PORT;

const server = http.createServer(app);

// prevent ELB 502 bad gateway
server.keepAliveTimeout = 6500;

server.listen(PORT, () => {
    console.log(`server start: ${PORT}`);
});

process.on('uncaughtException', (err) => {
    console.error('uncaughtException', formatError(err));
});

process.on('unhandledRejection', (err) => {
    console.error('unhandledRejection', formatError(err));
});
