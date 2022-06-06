"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const configPath = path_1.default.join(__dirname, `../.env.${process.env.NODE_ENV}`);
console.log(`use config: ${configPath}`);
dotenv_1.default.config({ path: configPath, debug: true });
const http_1 = __importDefault(require("http"));
const app_1 = require("./app");
const utils_1 = require("./utils");
const PORT = process.env.PORT;
const server = http_1.default.createServer(app_1.app);
// prevent ELB 502 bad gateway
server.keepAliveTimeout = 6500;
server.listen(PORT, () => {
    console.log(`server start: ${PORT}`);
});
process.on('uncaughtException', (err) => {
    console.error('uncaughtException', (0, utils_1.formatError)(err));
});
process.on('unhandledRejection', (err) => {
    console.error('unhandledRejection', (0, utils_1.formatError)(err));
});
//# sourceMappingURL=index.js.map