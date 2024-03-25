import z, { ZodError, ZodObject } from "zod";
import { fromZodError } from "zod-validation-error";

export const BASE_URL =
  process.env.TRAINING_API_URL ??
  process.env.NEXT_PUBLIC_TRAINING_API_URL ??
  "https://training.olinfo.it/api";

export async function api<T>(
  endpoint: string,
  body: object,
  schema: ZodObject<any, any, any, T, any>,
): Promise<T> {
  const resp = await fetch(`${BASE_URL}/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!resp.ok) {
    throw new Error(`Error ${resp.status}: ${resp.statusText}`);
  }

  const json = await resp.json();
  let data;
  try {
    data = z
      .discriminatedUnion("success", [
        schema.strict().extend({ success: z.literal(1) }),
        z.object({ success: z.literal(0), error: z.string() }),
      ])
      .parse(json);
  } catch (err) {
    console.error(err);
    throw fromZodError(err as ZodError);
  }

  if (data.success === 0) {
    throw new Error(data.error);
  }
  return data as T;
}
