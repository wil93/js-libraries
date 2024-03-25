export class FormFieldError extends Error {
  constructor(
    public field: string,
    public message: string,
  ) {
    super(message);
  }
}
