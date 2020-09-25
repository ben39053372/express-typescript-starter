import { Router } from 'express'
import { Container } from 'typedi'
import authService from '../../../services/auth.service'
import { IUserLogin } from '../../../models/user.model'
import { celebrate, Segments, errors } from 'celebrate'
import { userLoginSchema } from '../../../models/user.model'

const auth = Router() // baseUrl: /auth

auth.post('/login', celebrate({
  [Segments.BODY]: userLoginSchema
}), async (req, res, next) => {
  try {
    let userInputDTO: IUserLogin = req.body
    let authServiceInstance = Container.get(authService)
    let data = await authServiceInstance.login(userInputDTO.loginName, userInputDTO.saltedPassword)
    res.json(data)
  } catch (err) {
    next(err)
  }
})

/**
 * @TODO
 */
auth.post('/forgot-password', (req, res, next) => {
  res.json({
    message: "forgot-password"
  })
})

/**
 * @TODO
 */
auth.post('/logout', (req, res, next) => {
  res.json({
    message: 'log out'
  })
})

export default auth