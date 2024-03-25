import z from "zod";
import {
  alertSchema,
  caseValidationSchema,
  dateSchema,
  fileSchema,
  get,
} from "./common";

const caseFeedbackSchema = z.object({
  correct: z.boolean(),
  message: z.string().optional(),
});

export const submissionSchema = z.object({
  id: z.string(),
  token: z.string(),
  task: z.string(),
  score: z.number(),
  date: dateSchema,
  input: fileSchema.extend({ attempt: z.number() }),
  source: fileSchema,
  feedback: z.object({
    cases: caseFeedbackSchema.array(),
    alerts: alertSchema,
  }),
  output: fileSchema.extend({
    validation: z.object({
      cases: caseValidationSchema.array(),
      alerts: alertSchema,
    }),
  }),
});

const submissionsSchema = z.object({
  items: submissionSchema.array(),
});

export type Submission = z.infer<typeof submissionSchema>;

export function getSubmission(id: string): Promise<Submission> {
  return get(`submission/${id}`, submissionSchema);
}

export async function getSubmissions(
  token: string,
  task: string,
): Promise<Submission[]> {
  const { items } = await get(
    `user/${token}/submissions/${task}`,
    submissionsSchema,
  );
  return items;
}
