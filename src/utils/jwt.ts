import jwt from 'jsonwebtoken'
import CONFIG from '../config/environment'
import { findUserByEmail } from '../services/auth.service'

export const signJWT = (payload: object, options?: jwt.SignOptions | undefined): string => {
  return jwt.sign(payload, CONFIG.jwt_private, {
    ...(options && options),
    algorithm: 'RS256'
  })
}

export const verifyJWT = (token: string) => {
  try {
    const decoded: any = jwt.verify(token, CONFIG.jwt_public)

    return {
      valid: true,
      expired: false,
      decoded
    }
  } catch (error: any) {
    return {
      valid: false,
      expired: error.message === 'jwt is expired or not eligible to use',
      decoded: null
    }
  }
}

export const reIssueAccessToken = async (refreshToken: string) => {
  try {
    const { decoded } = verifyJWT(refreshToken)
    console.log(decoded)

    const user = await findUserByEmail(decoded)
    if (!user) return false

    const accessToken = signJWT(
      {
        ...user
      },
      {
        expiresIn: '1d'
      }
    )
    return accessToken
  } catch (error) {
    return error
  }
}
