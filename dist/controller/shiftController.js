"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteShifts = exports.getAllShifts = exports.createShift = void 0;
const shiftModel_1 = __importDefault(require("../model/shiftModel"));
const payrollController_1 = require("./payrollController");
const createShift = async (req, res) => {
    try {
        let { dateworked, start, finish, break: hasbreak, ratePerHour } = req.body;
        const date = new Date(dateworked);
        console.log(date);
        const formatDate = date.toLocaleDateString("en-GB").replace(/\//g, "-");
        const getDay = date.getDay();
        const existingShift = await shiftModel_1.default.findOne({
            dateworked: date,
        });
        if (existingShift) {
            return res.status(409).json({
                message: "A shift already exists for this date",
                existingShift,
            });
        }
        const [startHour, startMin] = start.split(":").map(Number);
        const [endHour, endMin] = finish.split(":").map(Number);
        const startDate = new Date(date);
        startDate.setHours(startHour, startMin, 0);
        const finishDate = new Date(date);
        finishDate.setHours(endHour, endMin, 0);
        const msWorked = finishDate.getTime() - startDate.getTime();
        let hoursworked = msWorked / (1000 * 60 * 60);
        if (hasbreak === "Unpaid Break") {
            hoursworked -= 1;
        }
        // console.log(hoursworked);
        const days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];
        const day = days[getDay];
        // const ratePerHourr = day === "Sunday" || day === "Saturday" ? 13.98 : 12.86;
        const amountEarned = ratePerHour * hoursworked;
        const data = await shiftModel_1.default.create({
            dateworked: date,
            start,
            finish,
            hoursworked,
            break: hasbreak,
            ratePerHour,
            amountEarned,
        });
        const payroll = await (0, payrollController_1.createSinglePayDay)(date);
        res.status(201).json({
            message: "shift created",
            data,
            payroll: payroll,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            message: "an error creating shift occured",
        });
    }
};
exports.createShift = createShift;
const getAllShifts = async (req, res) => {
    try {
        const allShifts = await shiftModel_1.default.find().sort({ createdAt: -1 });
        res.status(200).json({
            message: "all shift",
            data: allShifts,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            message: "unable to find/get shift",
        });
    }
};
exports.getAllShifts = getAllShifts;
const deleteShifts = async (req, res) => {
    try {
        await shiftModel_1.default.deleteMany();
        res.status(200).json({
            message: "deleted",
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            message: "error",
        });
    }
};
exports.deleteShifts = deleteShifts;
