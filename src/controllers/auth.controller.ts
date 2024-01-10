import { type Request, type Response } from 'express'
import { createSessionValidation, createUserValidation } from '../validations/auth.validation'
import { v4 as uuidv4 } from 'uuid'
import CustomValidationError from '../errors/validation.error'
import { createUser, findUserByEmail } from '../services/auth.service'
import { checkPassword, hashing } from '../utils/hashing'
import type UserType from '../types/user.type'
import { signJWT } from '../utils/jwt'

export const registerUser = async (req: Request, res: Response) => {
  try {
    const userId = uuidv4()
    const { error, value } = createUserValidation({ ...req.body, user_id: userId })
    if (error) {
      throw new CustomValidationError(422, error.details)
    }
    value.password = hashing(value.password)
    await createUser(value)

    return res.status(201).json({ status: true, statusCode: 201, message: 'Success register user' })
  } catch (error: any) {
    if (error instanceof CustomValidationError) {
      return res
        .status(error.statusCode)
        .json({ status: false, statusCode: error.statusCode, message: 'Validation Error', errors: error.errors })
    }

    if (error.code === 11000 && error.keyPattern && error.keyValue) {
      return res.status(422).json({
        status: false,
        statusCode: 422,
        message: 'Validation Error',
        errors: [{ field: 'email', message: 'Email is already in use' }]
      })
    }

    return res.status(500).json({ status: false, statusCode: 500, message: error.message })
  }
}

export const createSession = async (req: Request, res: Response) => {
  try {
    const { error, value } = createSessionValidation(req.body)
    if (error) {
      throw new CustomValidationError(422, error.details)
    }
    const user: UserType = await findUserByEmail(value.email)
    const isValid: boolean = checkPassword(value.password, user.password)
    if (!isValid) return res.status(401).json({ status: false, statusCode: 401, message: 'Invalid email or password' })

    const accessToken: string = signJWT({ ...user }, { expiresIn: '1d' })

    return res.status(200).json({ status: true, statusCode: 200, message: 'Login success', data: { accessToken } })
  } catch (error: any) {
    if (error instanceof CustomValidationError) {
      return res
        .status(error.statusCode)
        .json({ status: false, statusCode: error.statusCode, message: 'Validation Error', errors: error.errors })
    }
    return res.status(500).json({ status: false, statusCode: 500, message: error.message })
  }
}
