import { Router } from "express";
import { createShift, getAllShifts } from "../controller/shiftController";

const router: Router = Router();

router.route("/create_shift").post(createShift);
router.route("/get_shift").get(getAllShifts);
export default router;
