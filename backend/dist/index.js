"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const logger_1 = require("./lib/logger");
const port = Number(process.env.PORT) || 3000;
app_1.default.listen(port, () => {
    logger_1.logger.info({ port }, "EduGen ClassLink API server listening");
});
