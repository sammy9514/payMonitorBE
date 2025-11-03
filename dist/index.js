"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mainApp_1 = require("./mainApp");
const dotenv_1 = __importDefault(require("dotenv"));
const dbConfig_1 = require("./utils/dbConfig");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const port = parseInt(process.env.PORT);
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
(0, mainApp_1.mainApp)(app);
(0, dbConfig_1.dbConfig)();
app.listen(port, () => {
    console.log("server is up and running on", port);
});
