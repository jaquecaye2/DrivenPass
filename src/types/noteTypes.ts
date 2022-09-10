import { secure_notes } from '@prisma/client';

export type TypeNoteData = Omit<secure_notes, "id" | "created_at">;
