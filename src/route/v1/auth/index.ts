import { Router } from 'express'
import { Container } from 'typedi'
import authService from '../../../services/auth.service'
import { IUserLogin } from '../../../interfaces/user.t'

const auth = Router() // baseUrl: /auth

auth.post('/login', async (req, res, next) => {
  try {
    let userInputDTO: IUserLogin = req.body
    let authServiceInstance = Container.get(authService)
    let data = await authServiceInstance.login(userInputDTO.loginName, userInputDTO.saltedPassword)
    res.json(data)
  } catch (err) {
    next(err)
  }
})

auth.post('/forgot-password', (req, res, next) => {
  res.json({
    message: "forgot-password"
  })
})

auth.post('/logout', (req, res, next) => {
  res.json({
    message: 'log out'
  })
})

export default auth