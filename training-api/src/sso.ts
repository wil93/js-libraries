import z from "zod";

import { api } from "./common";

const forumSsoSchema = z.object({
  return_sso_url: z.string(),
  parameters: z.string(),
});

export type ForumSso = z.infer<typeof forumSsoSchema>;

export function getForumSso(payload: string, signature: string, cookie: string): Promise<ForumSso> {
  return api("sso", { payload, sig: signature }, forumSsoSchema, cookie);
}
