import z from "zod";

import { api } from "./common";

export async function signup(
  email: string,
  username: string,
  password: string,
  firstName: string,
  lastName: string,
  institute?: string,
  recaptchaResponse?: string,
) {
  await api(
    "user",
    {
      action: "new",
      email,
      email2: email,
      username,
      password,
      password2: password,
      firstname: firstName,
      lastname: lastName,
      institute,
      recaptcha_response: recaptchaResponse,
    },
    z.object({}),
  );
}
