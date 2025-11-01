import { Request, Response } from "express";
import payrollModel from "../model/payrollModel";
import shiftModel from "../model/shiftModel";

const getWeekStart = (date: Date) => {
  const localDate = new Date(date);
  const day = localDate.getDay();

  const dayToSaturday = (day + 1) % 7;
  const startWeek = new Date(date);
  startWeek.setDate(localDate.getDate() - dayToSaturday);
  return startWeek;
};

const getWeekEnd = (startDate: Date) => {
  const endWeek = new Date(startDate);
  endWeek.setDate(startDate.getDate() + 6);
  return endWeek;
};

const getPayDay = (endDate: Date) => {
  const payDay = new Date(endDate);
  payDay.setDate(endDate.getDate() + 14);
  return payDay;
};

export const createSinglePayDay = async (weekStartDate: Date) => {
  try {
    const startDate = getWeekStart(weekStartDate);
    const endDate = getWeekEnd(startDate);
    const payDay = getPayDay(endDate);

    const shifts = await shiftModel.find({
      dateworked: { $gte: startDate, $lte: endDate },
    });

    const totalAmount = shifts.reduce(
      (sum, shift) => sum + shift.amountEarned,
      0
    );

    const shiftId = shifts.map((shift) => shift._id);

    const checkPayday = await payrollModel.findOne({
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

    console.log(
      "start",
      startDate
      // shiftId.map((shift) => shift)
    );

    const payrollData = await payrollModel.create({
      startDate,
      endDate,
      payDay,
      totalAmount,
      shift: shiftId,
    });

    return { payrollData: payrollData };
  } catch (error) {
    console.log(error);
  }
};

export const createMultiplePayroll = async (req: Request, res: Response) => {
  try {
    const { pastWeeks, futureWeek } = req.body;
    const currentDate = new Date();
    const results: Array<{}> = [];

    //past weeks
    for (let i = pastWeeks; i >= 1; i--) {
      const pastWeek = new Date(currentDate);
      pastWeek.setDate(currentDate.getDate() - i * 7);

      const result = await createSinglePayDay(pastWeek);
      results.push({
        week: `${i} week`,
        ...result,
      });
    }

    //current week
    const result = await createSinglePayDay(currentDate);
    results.push({
      week: "current week",
      ...result,
    });

    //future weeks
    for (let i = 1; i <= futureWeek; i++) {
      const futureWeek = new Date(currentDate);
      futureWeek.setDate(currentDate.getDate() + i * 7);

      const result = await createSinglePayDay(futureWeek);
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
  } catch (error) {
    console.log(error);
  }
};

export const getMultiplePayoll = async (req: Request, res: Response) => {
  try {
    const data = await payrollModel
      .find()
      .populate("shift")
      .sort({ startDate: 1 });

    res.status(200).json({
      message: "success",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error",
    });
  }
};

export const deletePayroll = async (req: Request, res: Response) => {
  try {
    await payrollModel.deleteMany();
    res.status(200).json({
      message: "deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "error",
    });
  }
};
