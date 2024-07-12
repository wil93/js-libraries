import z, { type ZodError, type ZodType } from "zod";
import { fromZodError } from "zod-validation-error";

export const BASE_URL =
  process.env.TERRY_URL ?? process.env.NEXT_PUBLIC_TERRY_URL ?? "https://territoriali.olinfo.it/";

export async function get<T>(endpoint: string, schema: ZodType<T, any, any>): Promise<T> {
  const resp = await fetch(`${BASE_URL}/api/${endpoint}`);
  if (!resp.ok) {
    throw new Error(`Error ${resp.status}: ${resp.statusText}`);
  }

  const json = await resp.json();
  try {
    return schema.parse(json);
  } catch (err) {
    console.error(err);
    throw fromZodError(err as ZodError);
  }
}

export async function post(
  endpoint: string,
  body: Record<string, string | Blob>,
  schema?: undefined,
): Promise<void>;

export async function post<T>(
  endpoint: string,
  body: Record<string, string | Blob>,
  schema: ZodType<T, any, any>,
): Promise<T>;

export async function post<T>(
  endpoint: string,
  body: Record<string, string | Blob>,
  schema?: ZodType<T, any, any>,
): Promise<T | undefined> {
  const formData = new FormData();
  for (const key in body) {
    formData.append(key, body[key]);
  }

  const resp = await fetch(`${BASE_URL}/api/${endpoint}`, {
    method: "POST",
    body: formData,
  });
  if (!resp.ok) {
    throw new Error(`Error ${resp.status}: ${resp.statusText}`);
  }

  if (schema) {
    const json = await resp.json();
    try {
      return schema.parse(json);
    } catch (err) {
      console.error(err);
      throw fromZodError(err as ZodError);
    }
  }

  const text = await resp.text();
  if (text !== "") {
    throw new Error(`Invalid response: ${text}`);
  }
}

export async function staticFile(path: string) {
  const resp = await fetch(`${BASE_URL}/files/${path}`);
  if (!resp.ok) {
    throw new Error(`Error ${resp.status}: ${resp.statusText}`);
  }

  return resp.text();
}

export const dateSchema = z
  .string()
  .datetime({ offset: true })
  .transform((d) => new Date(d));

export const fileSchema = z.object({
  id: z.string(),
  date: dateSchema,
  path: z.string(),
  size: z.number(),
});

export const messageSchema = z.object({
  message: z.string(),
  severity: z.enum(["warning", "danger", "success"]),
});

export const caseValidationSchema = z.object({
  status: z.enum(["parsed", "invalid", "missing"]),
  message: z.string().optional(),
});

export const alertSchema = messageSchema.array();
