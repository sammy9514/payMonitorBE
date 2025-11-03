"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payrollController_1 = require("../controller/payrollController");
const router = (0, express_1.Router)();
router.route("/create_payroll").post(payrollController_1.createMultiplePayroll);
router.route("/get_payroll").get(payrollController_1.getMultiplePayoll);
router.route("/delete_payroll").delete(payrollController_1.deletePayroll);
exports.default = router;
