import { Application, Request, Response } from "express";
import shiftRoute from "./router/shiftRouter";
import payrollRoute from "./router/payrollRouter";

export const mainApp = (app: Application) => {
  app.use("/api/v1", shiftRoute);
  app.use("/api/v1/payroll", payrollRoute);
  app.get("/", (req: Request, res: Response) => {
    try {
      res.status(200).json({
        message: "default get request",
      });
    } catch (error) {
      res.status(400);
    }
  });
};
