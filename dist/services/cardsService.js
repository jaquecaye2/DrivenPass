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
exports.deleteCard = exports.findCard = exports.createCard = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const cardsRepository_1 = require("../repositories/cardsRepository");
const cryptr_1 = __importDefault(require("cryptr"));
dotenv_1.default.config();
function createCard(cardData) {
    return __awaiter(this, void 0, void 0, function* () {
        const title = cardData.title || "";
        const result = yield (0, cardsRepository_1.findByTitle)(title, cardData.user_id);
        if (result) {
            throw {
                code: "Unauthorized",
                message: "Título do cartão já está sendo utilizado",
            };
        }
        const key = process.env.SECRET_KEY || "";
        const cryptr = new cryptr_1.default(key);
        const encryptedPassword = cryptr.encrypt(cardData.password);
        const encryptedCvc = cryptr.encrypt(cardData.security_code);
        cardData.password = encryptedPassword;
        cardData.security_code = encryptedCvc;
        yield (0, cardsRepository_1.insertCard)(cardData);
        return "success";
    });
}
exports.createCard = createCard;
function findCard(user, id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!id) {
            const result = yield (0, cardsRepository_1.findAllCards)(user.id);
            if (!result) {
                throw {
                    code: "NotFound",
                    message: "Usuario não possui cartões cadastrados",
                };
            }
            const key = process.env.SECRET_KEY || "";
            const cryptr = new cryptr_1.default(key);
            const resultDecrypted = result.map(r => {
                r.password = cryptr.decrypt(r.password);
                r.security_code = cryptr.decrypt(r.security_code);
                return r;
            });
            return resultDecrypted;
        }
        else {
            const result = yield (0, cardsRepository_1.findById)(id, user.id);
            if (!result) {
                throw {
                    code: "NotFound",
                    message: "Cartão não encontrado",
                };
            }
            const key = process.env.SECRET_KEY || "";
            const cryptr = new cryptr_1.default(key);
            const decryptedPassword = cryptr.decrypt(result.password);
            const decryptedCVC = cryptr.decrypt(result.security_code);
            result.password = decryptedPassword;
            result.security_code = decryptedCVC;
            return result;
        }
    });
}
exports.findCard = findCard;
function deleteCard(user, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const findCard = yield (0, cardsRepository_1.findById)(id, user.id);
        if (!findCard) {
            throw {
                code: "NotFound",
                message: "Cartão não encontrado",
            };
        }
        yield (0, cardsRepository_1.deleteById)(id);
        return "success";
    });
}
exports.deleteCard = deleteCard;
