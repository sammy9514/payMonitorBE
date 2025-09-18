import { Router } from "express";
import {
  createShift,
  deleteShifts,
  getAllShifts,
} from "../controller/shiftController";

const router: Router = Router();

router.route("/create_shift").post(createShift);
router.route("/get_shift").get(getAllShifts);
router.route("/delete_shifts").delete(deleteShifts);
export default router;
