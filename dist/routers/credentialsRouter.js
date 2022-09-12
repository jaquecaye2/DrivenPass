"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const credentialsController_1 = require("../controllers/credentialsController");
const validateUser_1 = __importDefault(require("../middlewares/validateUser"));
const validateSchema_1 = require("../middlewares/validateSchema");
const credentialSchema_1 = __importDefault(require("../schemas/credentialSchema"));
const router = (0, express_1.Router)();
router.post("/credentials", validateUser_1.default, (0, validateSchema_1.validateSchema)(credentialSchema_1.default), credentialsController_1.createCredentials);
router.get("/credentials", validateUser_1.default, credentialsController_1.showCredentials);
router.delete("/credentials/:id", validateUser_1.default, credentialsController_1.deleteCredentials);
exports.default = router;
