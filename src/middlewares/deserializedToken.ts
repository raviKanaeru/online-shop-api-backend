import { type Request, type Response, type NextFunction } from 'express'
import { decode } from 'jsonwebtoken'
import { verifyJWT } from '../utils/jwt'

const deserializedUser = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken: string | undefined = req.headers.authorization?.replace(/^Bearer\s/, '')
  if (accessToken === undefined) {
    next()
    return
  }

  const { decoded, expired } = verifyJWT(accessToken)

  if (decoded) {
    res.locals.user = decode
    next()
    return
  }

  if (expired) {
    next()
    return
  }

  next()
}

export default deserializedUser
