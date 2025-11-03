"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConfig = void 0;
const mongoose_1 = require("mongoose");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dbURI = process.env.DATABASE_STRING;
const dbConfig = async () => {
    try {
        await (0, mongoose_1.connect)(dbURI);
        console.log("db is connected successfully");
    }
    catch (error) {
        console.log("unable to connect to db");
    }
};
exports.dbConfig = dbConfig;
