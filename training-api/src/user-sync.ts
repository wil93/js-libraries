import { jwtDecode } from "jwt-decode";
import z, { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

const syncUserSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  picture: z.string().transform((url) => `https:${url}`),
});

export type SyncUser = z.infer<typeof syncUserSchema>;

export function getMeSync(token: string): SyncUser {
  const payload = jwtDecode(token);
  try {
    return syncUserSchema.parse(payload);
  } catch (err) {
    throw fromZodError(err as ZodError);
  }
}
