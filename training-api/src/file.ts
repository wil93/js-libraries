import z from "zod";

import { BASE_URL } from "./common";

export const fileSchema = z.object({
  name: z.string(),
  digest: z.string(),
});

export type File = z.infer<typeof fileSchema>;

export function fileUrl(file: File) {
  return `${BASE_URL}/files/${file.digest}/${file.name}`;
}
