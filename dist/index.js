"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mainApp_1 = require("./mainApp");
const db_Config_1 = require("./utils/db.Config");
const app = (0, express_1.default)();
const port = 2266;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
(0, mainApp_1.mainApp)(app);
const server = app.listen(port, () => {
    console.clear();
    (0, db_Config_1.mainConnection)();
});
process.on("uncaughtException", (err) => {
    console.log("uncaughtException: ", err);
    process.exit(1);
});
process.on("unhandledRejection", (reason) => {
    console.log("unhandledRejection: ", reason);
    server.close(() => {
        process.exit(1);
    });
});
