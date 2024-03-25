import z from "zod";

import { api } from "./common";

const recoverSchema = z.object({
  message: z.string(),
  type: z.number(),
});

export async function recoverPassword(email: string, code: string) {
  await api("user", { action: "recover", email, code }, recoverSchema);
}

export async function sendRecoverCode(email: string) {
  await recoverPassword(email, "");
}
