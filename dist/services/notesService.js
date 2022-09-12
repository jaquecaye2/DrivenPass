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
exports.deleteNote = exports.findNote = exports.createNote = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const notesRepository_1 = require("../repositories/notesRepository");
dotenv_1.default.config();
function createNote(noteData) {
    return __awaiter(this, void 0, void 0, function* () {
        const title = noteData.title || "";
        const result = yield (0, notesRepository_1.findByTitle)(title, noteData.user_id);
        if (result) {
            throw {
                code: "Unauthorized",
                message: "Título da nota já está sendo utilizado",
            };
        }
        yield (0, notesRepository_1.insertNote)(noteData);
        return "success";
    });
}
exports.createNote = createNote;
function findNote(user, id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!id) {
            const result = yield (0, notesRepository_1.findAllNotes)(user.id);
            if (!result) {
                throw {
                    code: "NotFound",
                    message: "Usuario não possui notas cadastradas",
                };
            }
            return result;
        }
        else {
            const result = yield (0, notesRepository_1.findById)(id, user.id);
            if (!result) {
                throw {
                    code: "NotFound",
                    message: "Nota não encontrada",
                };
            }
            return result;
        }
    });
}
exports.findNote = findNote;
function deleteNote(user, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const findNote = yield (0, notesRepository_1.findById)(id, user.id);
        if (!findNote) {
            throw {
                code: "NotFound",
                message: "Nota não encontrada",
            };
        }
        yield (0, notesRepository_1.deleteById)(id);
        return "success";
    });
}
exports.deleteNote = deleteNote;
