"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const cardSchema = joi_1.default.object({
    title: joi_1.default.string().required(),
    number: joi_1.default.string().length(16).required(),
    name: joi_1.default.string().required(),
    security_code: joi_1.default.string().length(3).required(),
    expiration_date: joi_1.default.date().required(),
    password: joi_1.default.string().length(4).required(),
    isVirtual: joi_1.default.boolean().required(),
    type: joi_1.default.string().valid("credit", "debit", "both").required(),
});
exports.default = cardSchema;
