import { Request, Response } from "express";
import payrollModel from "../model/payrollModel";

export const createPayroll = async (req: Request, res: Response) => {
  try {
    // const {startDate, endDate} = req.body()
    const date = new Date();
    const day = date.getDay();
    const diffToSaturday = (day + 1) % 7;
    const startDate = new Date(date);
    startDate.setDate(date.getDate() - diffToSaturday);
    const formatStartDate = startDate
      .toLocaleDateString("en-GB")
      .replace(/\//g, "-");

    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    const formatEndDate = endDate
      .toLocaleDateString("en-GB")
      .replace(/\//g, "-");

    const payday = new Date();
    payday.setDate(endDate.getDate() + 14);
    const formatPayday = payday.toLocaleDateString().replace(/\//g, "-");

    const totalAmount = 0;

    const payrollData = await payrollModel.create({
      startDate,
      endDate,
      payday,
      totalAmount,
    });

    res.status(201).json({
      message: "payroll created",
      data: {
        ...payrollData.toObject(),
        startDate: formatStartDate,
        endDate: formatEndDate,
        payday: formatPayday,
        totalAmount,
      },
    });

    // console.log(formatStartDate[0]);
    // console.log(formateEndDate);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "failed to create payroll",
    });
  }
};
