import { cards } from '@prisma/client';

export type TypeCardData = Omit<cards, "id" | "created_at">;
