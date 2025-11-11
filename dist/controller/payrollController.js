"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePayroll = exports.getMultiplePayoll = exports.createMultiplePayroll = exports.createSinglePayDay = void 0;
const payrollModel_1 = __importDefault(require("../model/payrollModel"));
const shiftModel_1 = __importDefault(require("../model/shiftModel"));
const getWeekStart = (date) => {
    const localDate = new Date(date);
    const day = localDate.getDay();
    const dayToSaturday = (day + 1) % 7;
    const startWeek = new Date(date);
    startWeek.setDate(localDate.getDate() - dayToSaturday);
    return startWeek;
};
const getWeekEnd = (startDate) => {
    const endWeek = new Date(startDate);
    endWeek.setDate(startDate.getDate() + 6);
    return endWeek;
};
const getPayDay = (endDate) => {
    const payDay = new Date(endDate);
    payDay.setDate(endDate.getDate() + 14);
    return payDay;
};
const createSinglePayDay = async (weekStartDate) => {
    try {
        const startDate = getWeekStart(weekStartDate);
        const endDate = getWeekEnd(startDate);
        const payDay = getPayDay(endDate);
        const shifts = await shiftModel_1.default.find({
            dateworked: { $gte: startDate, $lte: endDate },
        });
        const totalAmount = shifts.reduce((sum, shift) => sum + shift.amountEarned, 0);
        const shiftId = shifts.map((shift) => shift._id);
        const checkPayday = await payrollModel_1.default.findOne({
            startDate: startDate,
            endDate: endDate,
        });
        console.log(startDate, "startdate");
        if (checkPayday) {
            checkPayday.totalAmount = totalAmount;
            checkPayday.shift = shiftId;
            await checkPayday.save();
            return { message: "payroll found", data: checkPayday };
        }
        console.log("start", startDate
        // shiftId.map((shift) => shift)
        );
        const payrollData = await payrollModel_1.default.create({
            startDate,
            endDate,
            payDay,
            totalAmount,
            shift: shiftId,
        });
        return { payrollData: payrollData };
    }
    catch (error) {
        console.log(error);
    }
};
exports.createSinglePayDay = createSinglePayDay;
const createMultiplePayroll = async (req, res) => {
    try {
        const { pastWeeks, futureWeek } = req.body;
        const currentDate = new Date();
        const results = [];
        //past weeks
        for (let i = pastWeeks; i >= 1; i--) {
            const pastWeek = new Date(currentDate);
            pastWeek.setDate(currentDate.getDate() - i * 7);
            const result = await (0, exports.createSinglePayDay)(pastWeek);
            results.push({
                week: `${i} week`,
                ...result,
            });
        }
        //current week
        const result = await (0, exports.createSinglePayDay)(currentDate);
        results.push({
            week: "current week",
            ...result,
        });
        //future weeks
        for (let i = 1; i <= futureWeek; i++) {
            const futureWeek = new Date(currentDate);
            futureWeek.setDate(currentDate.getDate() + i * 7);
            const result = await (0, exports.createSinglePayDay)(futureWeek);
            results.push({
                week: `${i} week future`,
                ...result,
            });
        }
        res.status(201).json({
            message: "payroll created",
            summary: {
                total: results.length,
            },
            data: results,
        });
        console.log(results);
    }
    catch (error) {
        console.log(error);
    }
};
exports.createMultiplePayroll = createMultiplePayroll;
const getMultiplePayoll = async (req, res) => {
    try {
        const data = await payrollModel_1.default
            .find()
            .sort({ startDate: 1 })
            .limit(10)
            .populate("shift")
            .lean();
        res.status(200).json({
            message: "success",
            data,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "error",
        });
    }
};
exports.getMultiplePayoll = getMultiplePayoll;
console.time("getMultiplePayoll");
console.timeEnd("getMultiplePayoll");
const deletePayroll = async (req, res) => {
    try {
        await payrollModel_1.default.deleteMany();
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
exports.deletePayroll = deletePayroll;
