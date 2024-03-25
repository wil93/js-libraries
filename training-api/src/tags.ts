import z from "zod";

import { api } from "./common";

const tagsSchema = z.object({
  tags: z.string().array(),
});

export async function getTags(filter?: string): Promise<string[]> {
  const list = await api("tag", { action: "list", filter }, tagsSchema);
  return list.tags;
}

export function getTechniqueTags(): Promise<string[]> {
  return getTags("techniques");
}

export function getEventTags(): Promise<string[]> {
  return getTags("events");
}

export async function addTag(task: string, tag: string) {
  await api("tag", { action: "add", task, tag }, z.object({}));
}

export async function removeTag(task: string, tag: string) {
  await api("tag", { action: "remove", task, tag }, z.object({}));
}
