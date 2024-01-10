import { Router } from 'express'
import { createSession, registerUser } from '../controllers/auth.controller'

export const AuthRouter: Router = Router()

AuthRouter.post('/register', registerUser)
AuthRouter.post('/login', createSession)
