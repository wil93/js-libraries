import z from "zod";

import { api } from "./common";

const contestSchema = z.object({
  analytics: z.string(),
  captcha_enabled: z.boolean(),
  cookie_domain: z.string(),
  description: z.string(),
  forum_url: z.string(),
  languages: z.string().array(),
  mail_enabled: z.boolean(),
  menu: z
    .object({
      title: z.string(),
      icon: z.string(),
    })
    .array(),
  name: z.string(),
  participates: z.boolean(),
  recaptcha_public_key: z.string(),
  title: z.string(),
  top_left_name: z.string(),
});

export type Contest = z.infer<typeof contestSchema>;

export function getContest() {
  return api("contest", { action: "get" }, contestSchema);
}
