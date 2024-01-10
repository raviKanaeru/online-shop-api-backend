import { type ValidationErrorItem } from 'joi'

export default class CustomValidationError extends Error {
  public statusCode: number
  // eslint-disable-next-line @typescript-eslint/member-delimiter-style
  public errors: Array<{ field: string; message: string }>

  // eslint-disable-next-line @typescript-eslint/space-before-function-paren
  constructor(statusCode: number, errors: ValidationErrorItem[]) {
    super('Validation Error')
    this.name = 'CustomValidationError'
    this.statusCode = statusCode
    this.errors = errors.map((err) => ({
      field: err.context?.key ?? 'unknown',
      message: err.message
    }))
  }
}
