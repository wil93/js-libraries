import z from "zod";

import { api } from "./common";

export async function login(
  username: string,
  password: string,
  keep_signed: boolean,
) {
  await api(
    "user",
    {
      action: "login",
      username,
      password,
      keep_signed,
    },
    z.object({}),
  );
}

export async function logout() {
  await api("user", { action: "logout" }, z.object({}));
}
