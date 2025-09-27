import { Request, Response } from "express";
import payrollModel from "../model/payrollModel";
import shiftModel from "../model/shiftModel";

const getWeekStart = (date: Date) => {
  const day = date.getDay();
  const diifToSaturday = (day + 1) % 7;
  const startWeek = new Date(date);
  startWeek.setDate(date.getDate() - diifToSaturday);
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

const createSinglePayDay = async (weekStartDate: Date) => {
  try {
    const startDate = getWeekStart(weekStartDate);
    const endDate = getWeekEnd(startDate);
    const payDay = getPayDay(endDate);

    const checkPayday = await payrollModel.findOne({
      startDate: startDate,
      endDate: endDate,
    });

    if (checkPayday) {
      return { message: "payroll found", data: checkPayday };
    }

    const shifts = await shiftModel.find({
      dateworked: { $gte: startDate, $lte: endDate },
    });

    const totalAmount = shifts.reduce(
      (sum, shift) => sum + shift.amountEarned,
      0
    );

    const payrollData = await payrollModel.create({
      startDate,
      endDate,
      payDay,
      totalAmount,
    });

    return { payrollData: payrollData };
  } catch (error) {
    console.log(error);
  }
};

export const getMultiplePayroll = async (req: Request, res: Response) => {
  try {
    const { pastWeeks, futureWeek } = req.body;
    const currentDate = new Date();
    const results: Array<{}> = [];

    //past weeks
    for (let i = pastWeeks; i >= 1; i--) {
      const pastWeeks = new Date(currentDate);
      pastWeeks.setDate(currentDate.getDate() - i * 7);

      const result = await createSinglePayDay(pastWeeks);
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
    for (let i = 1; i < futureWeek; i++) {
      const futureWeek = new Date(currentDate);
      futureWeek.setDate(currentDate.getDate() + i * 7);

      const result = await createSinglePayDay(futureWeek);
      results.push({
        week: `${i} week future`,
        ...result,
      });
    }

    const newPayroll = results.filter((r: any) => r !== r.existing);
    const existing = results.filter((r: any) => r === r.existing);

    res.status(201).json({
      message: "payroll created",
      summary: {
        total: results.length,
        created: newPayroll.length,
        existing: existing.length,
      },
      data: results,
    });
    console.log(results);
  } catch (error) {
    console.log(error);
  }
};

// export const deletePayroll = async (req:Request, res:Response)=>{
//   try {
//     await payrollModel.deleteMany()
//     res.status(200).json({
//       message: "deleted"
//     })
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({
//       message: "error",
//     });
//   }
// }
