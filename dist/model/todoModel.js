"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// schema
const todoModel = new mongoose_1.Schema({
    task: {
        type: String,
    },
    achieved: {
        type: String || null,
        default: null,
    },
    deadLine: {
        type: String,
    },
    done: {
        type: String,
        default: "start",
    },
}, {
    timestamps: true,
});
// converting it to model
exports.default = (0, mongoose_1.model)("todos", todoModel);
