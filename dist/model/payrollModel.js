"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const payrolllModel = new mongoose_1.Schema({
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
    shift: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Shift" }],
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)("Payroll", payrolllModel);
