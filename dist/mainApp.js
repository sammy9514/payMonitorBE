"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainApp = void 0;
const shiftRouter_1 = __importDefault(require("./router/shiftRouter"));
const payrollRouter_1 = __importDefault(require("./router/payrollRouter"));
const mainApp = (app) => {
    app.use("/api/v1", shiftRouter_1.default);
    app.use("/api/v1/payroll", payrollRouter_1.default);
    app.get("/", (req, res) => {
        try {
            res.status(200).json({
                message: "default get request",
            });
        }
        catch (error) {
            res.status(400);
        }
    });
};
exports.mainApp = mainApp;
