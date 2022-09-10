import { Request, Response } from "express";
import { users } from "@prisma/client";
import { TypeWifiData } from "../types/wifiTypes";
import { createWifi, deleteWifi, findWifi } from "../services/wifisService";

export async function createWifis(request: Request, response: Response) {
  const user: users = response.locals.user

  const wifi = request.body;

  let wifiData: TypeWifiData = {
    user_id: user.id,
    title: wifi.title,
    name_wifi: wifi.name_wifi,
    password: wifi.password
}

  const success = await createWifi(wifiData);

  if (success === "success") {
    return response.status(200).send("Wifi criado com sucesso");
  }

  response.status(500).send();
}

export async function showWifis(request: Request, response: Response) {
  const user: users = response.locals.user

  const id: number | undefined = Number(request.query.id)

  const result = await findWifi(user, id);

  if (result) {
    return response.status(200).send(result);
  }

  response.status(500).send();
}

export async function deleteWifis(request: Request, response: Response) {
  const user: users = response.locals.user

  const id: number = Number(request.params.id)

  const success = await deleteWifi(user, id);

  if (success === "success") {
    return response.status(200).send("Wifi deletado com sucesso");
  }

  response.status(500).send();
}
