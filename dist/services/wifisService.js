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
exports.deleteWifi = exports.findWifi = exports.createWifi = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const cryptr_1 = __importDefault(require("cryptr"));
const wifisRepository_1 = require("../repositories/wifisRepository");
dotenv_1.default.config();
function createWifi(wifiData) {
    return __awaiter(this, void 0, void 0, function* () {
        const key = process.env.SECRET_KEY || "";
        const cryptr = new cryptr_1.default(key);
        const encryptedPassword = cryptr.encrypt(wifiData.password);
        wifiData.password = encryptedPassword;
        yield (0, wifisRepository_1.insertWifi)(wifiData);
        return "success";
    });
}
exports.createWifi = createWifi;
function findWifi(user, id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!id) {
            const result = yield (0, wifisRepository_1.findAllWifi)(user.id);
            if (!result) {
                throw {
                    code: "NotFound",
                    message: "Usuario não possui wifi cadastrados",
                };
            }
            const key = process.env.SECRET_KEY || "";
            const cryptr = new cryptr_1.default(key);
            const resultDecrypted = result.map((r) => {
                r.password = cryptr.decrypt(r.password);
                return r;
            });
            return resultDecrypted;
        }
        else {
            const result = yield (0, wifisRepository_1.findById)(id, user.id);
            if (!result) {
                throw {
                    code: "NotFound",
                    message: "Wifi não encontrado",
                };
            }
            const key = process.env.SECRET_KEY || "";
            const cryptr = new cryptr_1.default(key);
            const decryptedPassword = cryptr.decrypt(result.password);
            result.password = decryptedPassword;
            return result;
        }
    });
}
exports.findWifi = findWifi;
function deleteWifi(user, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const findCard = yield (0, wifisRepository_1.findById)(id, user.id);
        if (!findCard) {
            throw {
                code: "NotFound",
                message: "Wifi não encontrado",
            };
        }
        yield (0, wifisRepository_1.deleteById)(id);
        return "success";
    });
}
exports.deleteWifi = deleteWifi;
