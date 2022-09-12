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
exports.deleteNotes = exports.showNotes = exports.createNotes = void 0;
const notesService_1 = require("../services/notesService");
function createNotes(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = response.locals.user;
        const note = request.body;
        const noteData = {
            user_id: user.id,
            title: note.title,
            note: note.note
        };
        const success = yield (0, notesService_1.createNote)(noteData);
        if (success === "success") {
            return response.status(200).send("Nota criada com sucesso");
        }
        response.status(500).send();
    });
}
exports.createNotes = createNotes;
function showNotes(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = response.locals.user;
        const id = Number(request.query.id);
        const result = yield (0, notesService_1.findNote)(user, id);
        if (result) {
            return response.status(200).send(result);
        }
        response.status(500).send();
    });
}
exports.showNotes = showNotes;
function deleteNotes(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = response.locals.user;
        const id = Number(request.params.id);
        const success = yield (0, notesService_1.deleteNote)(user, id);
        if (success === "success") {
            return response.status(200).send("Nota deletada com sucesso");
        }
        response.status(500).send();
    });
}
exports.deleteNotes = deleteNotes;
