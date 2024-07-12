import z from "zod";
import { fileSchema, post } from "./common";

export const inputSchema = fileSchema.extend({
  attempt: z.number(),
  task: z.string(),
  token: z.string(),
});

export type Input = z.infer<typeof inputSchema>;

export function generateInput(token: string, task: string): Promise<Input> {
  return post("generate_input", { token, task }, inputSchema);
}

export function abandonInput(token: string, id: string): Promise<void> {
  return post("abandon_input", { token, input_id: id });
}
