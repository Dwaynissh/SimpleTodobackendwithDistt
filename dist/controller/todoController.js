"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewOneAndDeleteTodo = exports.viewOneAndUpdateTodo = exports.viewOneTodo = exports.viewTodos = exports.createTodo = void 0;
const statusCode_1 = require("../utils/statusCode");
const todoModel_1 = __importDefault(require("../model/todoModel"));
const moment_1 = __importDefault(require("moment"));
const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { task, time } = req.body;
        let newTime = time * 1000;
        let realTime = new Date().getTime() + newTime;
        console.log(task);
        console.log((0, moment_1.default)(Date.parse(time[1])).format("LLLL"));
        console.log((0, moment_1.default)(Date.parse("Mon Nov 06 2023 00:00:00 GMT+0100 (West Africa Standard Time)")).format("LLLL"));
        const todo = yield todoModel_1.default.create({
            task,
            deadLine: (0, moment_1.default)(Date.parse(time[1])).format("LLLL"),
        });
        let timing = setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
            yield todoModel_1.default.findByIdAndUpdate(todo._id, {
                achieved: "Terminated",
            }, { new: true });
            clearTimeout(timing);
            console.log("done");
        }), newTime);
        return res.status(statusCode_1.statusCode.CREATED).json({
            message: "Created",
            data: todo,
        });
    }
    catch (error) {
        return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
            message: "Error",
        });
    }
});
exports.createTodo = createTodo;
const viewTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todo = yield todoModel_1.default.find().sort({ createdAt: -1 });
        return res.status(statusCode_1.statusCode.OK).json({
            message: "find",
            data: todo,
        });
    }
    catch (error) {
        return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
            message: "Error",
        });
    }
});
exports.viewTodos = viewTodos;
const viewOneTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { todoID } = req.params;
        const todo = yield todoModel_1.default.findById(todoID);
        return res.status(statusCode_1.statusCode.OK).json({
            message: "find",
            data: todo,
        });
    }
    catch (error) {
        return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
            message: "Error",
        });
    }
});
exports.viewOneTodo = viewOneTodo;
const viewOneAndUpdateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { done } = req.body;
        const { todoID } = req.params;
        const check = yield todoModel_1.default.findById(todoID);
        if (!!(check === null || check === void 0 ? void 0 : check.achieved)) {
            return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                message: "Time has Elapse",
            });
        }
        else {
            const todo = yield todoModel_1.default.findByIdAndUpdate(todoID, { done }, { new: true });
            return res.status(statusCode_1.statusCode.CREATED).json({
                message: "find",
                data: todo,
            });
        }
    }
    catch (error) {
        return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
            message: "Error",
        });
    }
});
exports.viewOneAndUpdateTodo = viewOneAndUpdateTodo;
const viewOneAndDeleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { task, time } = req.body;
        const { todoID } = req.params;
        const todo = yield todoModel_1.default.findByIdAndDelete(todoID);
        return res.status(statusCode_1.statusCode.CREATED).json({
            message: "find",
            data: todo,
        });
    }
    catch (error) {
        return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
            message: "Error",
        });
    }
});
exports.viewOneAndDeleteTodo = viewOneAndDeleteTodo;
