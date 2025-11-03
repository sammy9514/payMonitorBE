"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const shiftModel = new mongoose_1.Schema({
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
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)("Shift", shiftModel);
