import { PrismaClient } from "@prisma/client";
import { beforeEach } from "vitest";
import { mockDeep, mockReset } from "vitest-mock-extended";

export const db = mockDeep<PrismaClient>();

beforeEach(() => {
  mockReset(db);
});
