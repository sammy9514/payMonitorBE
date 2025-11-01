import { model, Schema } from "mongoose";

interface shiftSessionSchema {
  dateworked: Date;
  hoursworked: number;
  start: string;
  finish: string;
  break: string;
  ratePerHour: number;
  amountEarned: number;
}

interface shiftData extends shiftSessionSchema, Document {}

const shiftModel = new Schema<shiftData>(
  {
    dateworked: {
      type: Date,
      required: true,
    },
    start: {
      type: String,
      required: true,
    },
    finish: {
      type: String,
      required: true,
    },
    hoursworked: {
      type: Number,
    },
    ratePerHour: {
      type: Number,
      required: true,
    },
    break: {
      type: String,
      // default: "Unpaid break",
    },
    amountEarned: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model<shiftData>("Shift", shiftModel);
