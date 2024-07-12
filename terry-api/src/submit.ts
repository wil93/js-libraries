import z from "zod";
import { alertSchema, caseValidationSchema, fileSchema, post } from "./common";
import { submissionSchema } from "./submissions";

const uploadedSourceSchema = fileSchema.extend({
  input: z.string(),
  validation: z.object({
    alerts: alertSchema,
  }),
});

export function uploadSource(id: string, file: File) {
  return post("upload_source", { input_id: id, file }, uploadedSourceSchema);
}

const uploadedOutputSchema = fileSchema.extend({
  input: z.string(),
  validation: z.object({
    cases: caseValidationSchema.array(),
    alerts: alertSchema,
  }),
});

export function uploadOutput(id: string, file: File) {
  return post("upload_output", { input_id: id, file }, uploadedOutputSchema);
}

export function submit(inputId: string, sourceId: string, outputId: string) {
  return post(
    "submit",
    {
      input_id: inputId,
      source_id: sourceId,
      output_id: outputId,
    },
    submissionSchema,
  );
}
