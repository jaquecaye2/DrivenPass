"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateUser_1 = __importDefault(require("../middlewares/validateUser"));
const validateSchema_1 = require("../middlewares/validateSchema");
const cardsController_1 = require("../controllers/cardsController");
const cardSchema_1 = __importDefault(require("../schemas/cardSchema"));
const router = (0, express_1.Router)();
router.post("/cards", validateUser_1.default, (0, validateSchema_1.validateSchema)(cardSchema_1.default), cardsController_1.createCards);
router.get("/cards", validateUser_1.default, cardsController_1.showCards);
router.delete("/cards/:id", validateUser_1.default, cardsController_1.deleteCards);
exports.default = router;
