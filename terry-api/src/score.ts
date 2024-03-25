import z from "zod";
import { get } from "./common";

const taskSchema = z.object({
  name: z.string(),
  title: z.string(),
  score: z.number(),
  max_score: z.number(),
});

const scoresSchema = taskSchema.array();

export type Scores = z.infer<typeof scoresSchema>;

export function getScores(token: string): Promise<Scores> {
  return get(`user/${token}/scores`, scoresSchema);
}
