import { credentials } from '@prisma/client';

export type TypeCredentialData = Omit<credentials, "id" | "created_at">;
