import { model, Schema } from "mongoose";

interface shiftSessionSchema {
  dateworked: string;
  hoursworked: number;
  start: string;
  finish: string;
  break: boolean;
  ratePerHour: number;
  amountEarned: number;
}

interface shiftData extends shiftSessionSchema, Document {}

const shiftModel = new Schema<shiftData>(
  {
    dateworked: {
      type: String,
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
      enum: [12.86, 13.98],
      default: 12.86,
      required: true,
    },
    break: {
      type: Boolean,
      default: false,
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
