import { type Request, type Response, type NextFunction } from 'express'

export const requireUser = (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user
  if (!user) {
    return res.status(401).json({ status: false, statusCode: 401, message: 'Token not provided!' })
  }
  next()
}

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user
  if (!user || user._doc.role !== 'admin') {
    return res
      .sendStatus(403)
      .json({ status: false, statusCode: 403, message: 'You do not have permission to access.' })
  }
}
