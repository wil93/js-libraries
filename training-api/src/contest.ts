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

  // admin only
  all_languages: z.string().array().optional(),
  mail_from: z.string().optional(),
  mail_password: z.string().optional(),
  mail_server: z.string().optional(),
  mail_username: z.string().optional(),
  menu_on_db: z.any().optional(),
  recaptcha_secret_key: z.string().optional(),
});

export type Contest = z.infer<typeof contestSchema>;

export function getContest() {
  return api("contest", { action: "get" }, contestSchema);
}
