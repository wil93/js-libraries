import z from "zod";

import { api } from "./common";
import { fileSchema } from "./file";
import type { Task } from "./task";

const testcaseSchema = z.object({
  idx: z.string(),
  memory: z.number().nullable(),
  outcome: z.enum(["Correct", "Partially correct", "Not correct"]),
  text: z.string(),
  time: z.number().nullable(),
});

const baseSubtaskSchema = z.object({
  idx: z.number().optional(),
  max_score: z.number(),
  testcases: testcaseSchema.array(),
});

const subtaskSchema = z.union([
  baseSubtaskSchema.extend({ score: z.number() }),
  baseSubtaskSchema
    .extend({ score_fraction: z.number() })
    .transform(({ score_fraction, ...subtask }) => ({
      ...subtask,
      score: score_fraction * subtask.max_score,
    })),
]);

const submissionSchema = z.object({
  compilation_outcome: z.enum(["ok", "fail"]).nullable(),
  evaluation_outcome: z.literal("ok").nullable(),
  files: fileSchema.array(),
  id: z.number(),
  score: z.number().nullable().optional(),
  task_id: z.number(),
  timestamp: z.number().transform((n) => new Date(n * 1000)),
});

const submissionDetailsSchema = submissionSchema.extend({
  compilation_memory: z.number().nullable(),
  compilation_time: z.number().nullable(),
  compilation_stdout: z.string().nullable(),
  compilation_stderr: z.string().nullable(),
  score_details: subtaskSchema.array().nullable(),
  language: z.string().nullable(),
});

const taskSubmissionsSchema = z.object({
  submissions: submissionSchema.array(),
});

export type Subtask = z.infer<typeof subtaskSchema>;
export type Submission = z.infer<typeof submissionSchema>;
export type SubmissionDetails = z.infer<typeof submissionDetailsSchema>;

export async function getTaskSubmissions(task: string): Promise<Submission[]> {
  const list = await api("submission", { action: "list", task_name: task }, taskSubmissionsSchema);
  return list.submissions;
}

export function getSubmission(id: number): Promise<SubmissionDetails> {
  return api("submission", { action: "details", id }, submissionDetailsSchema);
}

export async function submitBatch(task: Task, language: string, file: File): Promise<Submission> {
  return api(
    "submission",
    {
      action: "new",
      task_name: task.name,
      files: {
        [task.submission_format[0]]: {
          data: await toBase64(file),
          filename: file.name,
          language,
        },
      },
    },
    submissionSchema,
  );
}

export async function submitOutputOnly(
  task: Task,
  files: Record<string, File>,
): Promise<Submission> {
  const encodedFiles = await Promise.all(
    task.submission_format.map(
      async (fileName) =>
        [
          fileName,
          {
            data: await toBase64(files[fileName]),
            filename: files[fileName].name,
          },
        ] as const,
    ),
  );

  return api(
    "submission",
    {
      action: "new",
      task_name: task.name,
      files: Object.fromEntries(encodedFiles),
    },
    submissionSchema,
  );
}

export function isEvaluating(submission: Submission) {
  if (submission.compilation_outcome === null) return true;
  if (submission.compilation_outcome === "fail") return false;
  return submission.evaluation_outcome === null;
}

async function toBase64(blob: Blob) {
  const buffer = await blob.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  return btoa(String.fromCodePoint(...bytes));
}
