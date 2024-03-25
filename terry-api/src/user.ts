import z from "zod";
import { dateSchema, get } from "./common";
import { inputSchema } from "./input";

const taskSchema = z.object({
  name: z.string(),
  title: z.string(),
  statement_path: z.string(),
  max_score: z.number(),
  num: z.number(),
  submission_timeout: z.number().nullable(),
});

const taskScoreSchema = z.object({
  name: z.string(),
  score: z.number(),
  current_input: inputSchema
    .extend({ expiry_date: dateSchema.nullable() })
    .nullable(),
});

const userSchema = z.object({
  token: z.string(),
  name: z.string(),
  surname: z.string(),
  sso_user: z.number(),
  contest: z.object({
    has_started: z.boolean(),
    name: z.string(),
    description: z.string(),
    start_time: dateSchema,
    tasks: taskSchema.array(),
  }),
  contest_start_delay: z.number().nullable(),
  total_score: z.number(),
  tasks: z.record(taskScoreSchema),
});

export type User = z.infer<typeof userSchema>;

export function getUser(token: string): Promise<User> {
  return get(`user/${token}`, userSchema);
}
