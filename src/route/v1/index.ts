import { Router } from 'express'
import rootRouter from './root'
import userRouter from './user'
import authRouter from './auth'

const api = Router()

api.use('/', rootRouter)

api.use('/user', userRouter)

api.use('/auth', authRouter)

export default api

