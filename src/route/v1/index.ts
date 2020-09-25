import { Router } from 'express'
import rootRouter from './root'
import userRouter from './user'
import authRouter from './auth'
import categoryRouter from './category'

const api = Router()

api.use('/', rootRouter)

api.use('/user', userRouter)

api.use('/auth', authRouter)

api.use('/category', categoryRouter)

export default api

