import { model, Schema, Types } from "mongoose";

interface payrollSchema {
  startDate: Date;
  endDate: Date;
  payDay: Date;
  status: "paid" | "pending";
  totalAmount: number;
  shift: Types.ObjectId[];
}

interface payrollData extends payrollSchema, Document {}

const payrolllModel = new Schema<payrollData>(
  {
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    payDay: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["paid", "pending"],
      default: "pending",
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    shift: [{ type: Schema.Types.ObjectId, ref: "Shift" }],
  },
  {
    timestamps: true,
  }
);

export default model<payrollData>("Payroll", payrolllModel);
