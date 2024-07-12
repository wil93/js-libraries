import z from "zod";

import { api } from "./common";
import type { File } from "./file";

const attachmentSchema = z
  .tuple([z.string(), z.string()])
  .transform(([name, digest]): File => ({ name, digest }));

const tag = z.object({
  name: z.string(),
  can_delete: z.boolean(),
});

const taskSchema = z.object({
  attachments: attachmentSchema.array(),
  help_available: z.boolean(),
  id: z.number(),
  memory_limit: z.number().nullable(),
  name: z.string(),
  score_multiplier: z.number(),
  statements: z.record(z.string()),
  submission_format: z.string().array(),
  supported_languages: z.string().array(),
  tags: tag.array(),
  task_type: z.enum(["Batch", "OutputOnly", "Communication"]),
  time_limit: z.number().nullable(),
  title: z.string(),
});

export type Tag = z.infer<typeof tag>;
export type Task = z.infer<typeof taskSchema>;

export function getTask(name: string): Promise<Task> {
  return api("task", { action: "get", name }, taskSchema);
}
