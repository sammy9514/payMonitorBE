import { Request, Response } from "express";
import shiftModel from "../model/shiftModel";

export const createShift = async (req: Request, res: Response) => {
  try {
    let { dateworked, start, finish, break: hasbreak } = req.body;
    const date = new Date(dateworked);
    const formatDate = date.toLocaleDateString("en-GB").replace(/\//g, "-");
    const getDay = date.getDay();

    const [startHour, startMin] = start.split(":").map(Number);
    const [endHour, endMin] = finish.split(":").map(Number);

    const startDate = new Date();
    startDate.setHours(startHour, startMin, 0);

    const finishDate = new Date();
    finishDate.setHours(endHour, endMin, 0);

    const msWorked = finishDate.getTime() - startDate.getTime();
    let hoursworked = msWorked / (1000 * 60 * 60);

    if (hasbreak) {
      hoursworked -= 1;
    }

    console.log(hoursworked);

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

    const ratePerHour = day === "Sunday" || day === "Saturday" ? 13.98 : 12.86;
    const amountEarned = (ratePerHour * hoursworked).toFixed(2);

    const data = await shiftModel.create({
      dateworked: formatDate,
      start,
      finish,
      hoursworked,
      break: hasbreak,
      ratePerHour,
      amountEarned,
    });

    res.status(201).json({
      message: "shift created",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "an error creating shift occured",
    });
  }
};

export const getAllShifts = async (req: Request, res: Response) => {
  try {
    const allShifts = await shiftModel.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: "all shift",
      data: allShifts,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "unable to find/get shift",
    });
  }
};
