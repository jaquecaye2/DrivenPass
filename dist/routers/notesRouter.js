"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateUser_1 = __importDefault(require("../middlewares/validateUser"));
const validateSchema_1 = require("../middlewares/validateSchema");
const noteSchema_1 = __importDefault(require("../schemas/noteSchema"));
const notesController_1 = require("../controllers/notesController");
const router = (0, express_1.Router)();
router.post("/notes", validateUser_1.default, (0, validateSchema_1.validateSchema)(noteSchema_1.default), notesController_1.createNotes);
router.get("/notes", validateUser_1.default, notesController_1.showNotes);
router.delete("/notes/:id", validateUser_1.default, notesController_1.deleteNotes);
exports.default = router;
