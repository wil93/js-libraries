import z from "zod";

import { api } from "./common";

const taskSummarySchema = z.object({
  id: z.number(),
  name: z.string(),
  score: z.number().optional(),
  score_multiplier: z.number(),
  title: z.string(),
});

const taskListSchema = z.object({
  num: z.number(),
  tasks: taskSummarySchema.array(),
  tags: z.string().array().optional(),
});

export type TaskSummary = z.infer<typeof taskSummarySchema>;
export type TaskList = z.infer<typeof taskListSchema>;

export type TaskListOptions = {
  search?: string;
  tag?: string;
  order?: "hardest" | "easiest";
};

export function getTaskList(
  page: number,
  pageSize = 20,
  options?: TaskListOptions,
  cookie?: string,
): Promise<TaskList> {
  const first = (page - 1) * pageSize;
  const last = first + pageSize;

  return api("task", { action: "list", first, last, ...options }, taskListSchema, cookie);
}
