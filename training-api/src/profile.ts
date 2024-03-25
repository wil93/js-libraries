import z from "zod";

import { api } from "./common";

export async function changeEmail(email: string) {
  await api("user", { action: "update", email }, z.object({}));
}

export async function changePassword(oldPassword: string, newPassword: string) {
  await api(
    "user",
    {
      action: "update",
      email: "",
      old_password: oldPassword,
      password: newPassword,
    },
    z.object({ token: z.string() }),
  );
}

export async function changeSchool(institute: number | string) {
  await api("user", { action: "update", institute }, z.object({}));
}
