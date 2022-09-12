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
exports.deleteCredentials = exports.showCredentials = exports.createCredentials = void 0;
const credentialsService_1 = require("../services/credentialsService");
function createCredentials(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = response.locals.user;
        const credential = request.body;
        const credentialData = {
            user_id: user.id,
            title: credential.title,
            url: credential.url,
            user_name: credential.user_name,
            password: credential.password
        };
        const success = yield (0, credentialsService_1.createCredential)(credentialData);
        if (success === "success") {
            return response.status(200).send("Credencial criada com sucesso");
        }
        response.status(500).send();
    });
}
exports.createCredentials = createCredentials;
function showCredentials(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = response.locals.user;
        const id = Number(request.query.id);
        const result = yield (0, credentialsService_1.findCredentials)(user, id);
        if (result) {
            return response.status(200).send(result);
        }
        response.status(500).send();
    });
}
exports.showCredentials = showCredentials;
function deleteCredentials(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = response.locals.user;
        const id = Number(request.params.id);
        const success = yield (0, credentialsService_1.deleteCredential)(user, id);
        if (success === "success") {
            return response.status(200).send("Credencial deletada com sucesso");
        }
        response.status(500).send();
    });
}
exports.deleteCredentials = deleteCredentials;
