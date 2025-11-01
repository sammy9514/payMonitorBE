import { Router } from "express";
import {
  // createPayroll,
  createMultiplePayroll,
  getMultiplePayoll,
  deletePayroll,
} from "../controller/payrollController";

const router: Router = Router();

router.route("/create_payroll").post(createMultiplePayroll);
router.route("/get_payroll").get(getMultiplePayoll);
router.route("/delete_payroll").delete(deletePayroll);

export default router;
