"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const shiftController_1 = require("../controller/shiftController");
const router = (0, express_1.Router)();
router.route("/create_shift").post(shiftController_1.createShift);
router.route("/get_shift").get(shiftController_1.getAllShifts);
router.route("/delete_shifts").delete(shiftController_1.deleteShifts);
exports.default = router;
