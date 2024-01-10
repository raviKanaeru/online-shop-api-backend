import { type ValidationErrorItem } from 'joi'

export default class CustomValidationError extends Error {
  public statusCode: number
  public errors: Array<{ field: string, message: string }>

  constructor (statusCode: number, errors: ValidationErrorItem[]) {
    super('Validation Error')
    this.name = 'CustomValidationError'
    this.statusCode = statusCode
    this.errors = errors.map((err) => ({
      field: err.context?.key ?? 'unknown',
      message: err.message
    }))
  }
}
