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
exports.deleteCards = exports.showCards = exports.createCards = void 0;
const cardsService_1 = require("../services/cardsService");
function createCards(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = response.locals.user;
        const note = request.body;
        let cardData = {
            user_id: user.id,
            title: note.title,
            number: note.number,
            name: note.name,
            security_code: note.security_code,
            expiration_date: note.expiration_date,
            password: note.password,
            isVirtual: note.isVirtual,
            type: note.type
        };
        const success = yield (0, cardsService_1.createCard)(cardData);
        if (success === "success") {
            return response.status(200).send("Cartão criado com sucesso");
        }
        response.status(500).send();
    });
}
exports.createCards = createCards;
function showCards(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = response.locals.user;
        const id = Number(request.query.id);
        const result = yield (0, cardsService_1.findCard)(user, id);
        if (result) {
            return response.status(200).send(result);
        }
        response.status(500).send();
    });
}
exports.showCards = showCards;
function deleteCards(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = response.locals.user;
        const id = Number(request.params.id);
        const success = yield (0, cardsService_1.deleteCard)(user, id);
        if (success === "success") {
            return response.status(200).send("Cartão deletado com sucesso");
        }
        response.status(500).send();
    });
}
exports.deleteCards = deleteCards;
