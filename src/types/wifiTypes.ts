import { wifis } from '@prisma/client';

export type TypeWifiData = Omit<wifis, "id" | "created_at">;
