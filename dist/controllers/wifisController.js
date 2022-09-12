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
exports.deleteWifis = exports.showWifis = exports.createWifis = void 0;
const wifisService_1 = require("../services/wifisService");
function createWifis(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = response.locals.user;
        const wifi = request.body;
        let wifiData = {
            user_id: user.id,
            title: wifi.title,
            name_wifi: wifi.name_wifi,
            password: wifi.password
        };
        const success = yield (0, wifisService_1.createWifi)(wifiData);
        if (success === "success") {
            return response.status(200).send("Wifi criado com sucesso");
        }
        response.status(500).send();
    });
}
exports.createWifis = createWifis;
function showWifis(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = response.locals.user;
        const id = Number(request.query.id);
        const result = yield (0, wifisService_1.findWifi)(user, id);
        if (result) {
            return response.status(200).send(result);
        }
        response.status(500).send();
    });
}
exports.showWifis = showWifis;
function deleteWifis(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = response.locals.user;
        const id = Number(request.params.id);
        const success = yield (0, wifisService_1.deleteWifi)(user, id);
        if (success === "success") {
            return response.status(200).send("Wifi deletado com sucesso");
        }
        response.status(500).send();
    });
}
exports.deleteWifis = deleteWifis;
