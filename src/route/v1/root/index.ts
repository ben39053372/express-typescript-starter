import { Router, Request, Response, NextFunction } from 'express'

const rootRoute = Router()

rootRoute.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send(`Hello Express Typescript Starter. Server Time: ${new Date()}`)
})

export default rootRoute