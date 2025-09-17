import { Router } from "express";
import { createPayroll } from "../controller/payrollController";

const router: Router = Router();

router.route("/create_payroll").post(createPayroll);

export default router;
