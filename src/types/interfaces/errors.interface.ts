export type ErrorsType = {
  errorsMessages: Array<FieldErrorType>
}

export type FieldErrorType = {
  message:string;
  field:string;
}