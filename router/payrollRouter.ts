import { Router } from "express";
import {
  createPayroll,
  getMultiplePayroll,
} from "../controller/payrollController";

const router: Router = Router();

router.route("/create_payroll").post(getMultiplePayroll);

export default router;
