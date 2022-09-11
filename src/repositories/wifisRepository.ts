import { prisma } from "../config/database";
import { TypeWifiData } from "../types/wifiTypes";

export async function insertWifi(wifiData: TypeWifiData) {
  await prisma.wifis.create({ data: wifiData });
}

export async function findByTitle(title: string, user_id: number) {
  const result = await prisma.wifis.findFirst({
    where: { title, user_id },
  });
  return result;
}

export async function findAllWifi(user_id: number) {
  const result = await prisma.wifis.findMany({ where: { user_id } });
  return result;
}

export async function findById(id: number, user_id: number) {
  const result = await prisma.wifis.findFirst({ where: { id, user_id } });
  return result;
}

export async function deleteById(id: number) {
  await prisma.wifis.delete({ where: { id } });
}
