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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteById = exports.findById = exports.findAllCards = exports.findByTitle = exports.insertCard = void 0;
const database_1 = require("../config/database");
function insertCard(cardData) {
    return __awaiter(this, void 0, void 0, function* () {
        yield database_1.prisma.cards.create({ data: cardData });
    });
}
exports.insertCard = insertCard;
function findByTitle(title, user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield database_1.prisma.cards.findFirst({
            where: { title, user_id },
        });
        return result;
    });
}
exports.findByTitle = findByTitle;
function findAllCards(user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield database_1.prisma.cards.findMany({ where: { user_id } });
        return result;
    });
}
exports.findAllCards = findAllCards;
function findById(id, user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield database_1.prisma.cards.findFirst({ where: { id, user_id } });
        return result;
    });
}
exports.findById = findById;
function deleteById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield database_1.prisma.cards.delete({ where: { id } });
    });
}
exports.deleteById = deleteById;
