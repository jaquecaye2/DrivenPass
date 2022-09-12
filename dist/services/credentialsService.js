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
exports.deleteCredential = exports.findCredentials = exports.createCredential = void 0;
const cryptr_1 = __importDefault(require("cryptr"));
const dotenv_1 = __importDefault(require("dotenv"));
const credentialsRepository_1 = require("../repositories/credentialsRepository");
dotenv_1.default.config();
function createCredential(credentialData) {
    return __awaiter(this, void 0, void 0, function* () {
        const title = credentialData.title || "";
        const result = yield (0, credentialsRepository_1.findByTitle)(title, credentialData.user_id);
        if (result) {
            throw {
                code: "Unauthorized",
                message: "Título da credencial já está sendo utilizado",
            };
        }
        const key = process.env.SECRET_KEY || "";
        const cryptr = new cryptr_1.default(key);
        const encryptedPassword = cryptr.encrypt(credentialData.password);
        const credentialDataEncrypted = {
            user_id: credentialData.user_id,
            title: credentialData.title,
            url: credentialData.url,
            user_name: credentialData.user_name,
            password: encryptedPassword,
        };
        yield (0, credentialsRepository_1.insertCredential)(credentialDataEncrypted);
        return "success";
    });
}
exports.createCredential = createCredential;
function findCredentials(user, id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!id) {
            const result = yield (0, credentialsRepository_1.findAllCredentials)(user.id);
            if (!result) {
                throw {
                    code: "NotFound",
                    message: "Usuario não possui credenciais cadastradas",
                };
            }
            const key = process.env.SECRET_KEY || "";
            const cryptr = new cryptr_1.default(key);
            const resultDecrypted = result.map(r => {
                r.password = cryptr.decrypt(r.password);
                return r;
            });
            return resultDecrypted;
        }
        else {
            let result = yield (0, credentialsRepository_1.findById)(id, user.id);
            if (!result) {
                throw {
                    code: "NotFound",
                    message: "Credencial não encontrada",
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
exports.findCredentials = findCredentials;
function deleteCredential(user, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const findCredential = yield (0, credentialsRepository_1.findById)(id, user.id);
        if (!findCredential) {
            throw {
                code: "NotFound",
                message: "Credencial não encontrada",
            };
        }
        yield (0, credentialsRepository_1.deleteById)(id);
        return "success";
    });
}
exports.deleteCredential = deleteCredential;
