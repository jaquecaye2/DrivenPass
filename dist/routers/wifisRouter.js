"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateUser_1 = __importDefault(require("../middlewares/validateUser"));
const validateSchema_1 = require("../middlewares/validateSchema");
const wifiSchema_1 = __importDefault(require("../schemas/wifiSchema"));
const wifisController_1 = require("../controllers/wifisController");
const router = (0, express_1.Router)();
router.post("/wifi", validateUser_1.default, (0, validateSchema_1.validateSchema)(wifiSchema_1.default), wifisController_1.createWifis);
router.get("/wifi", validateUser_1.default, wifisController_1.showWifis);
router.delete("/wifi/:id", validateUser_1.default, wifisController_1.deleteWifis);
//
exports.default = router;
