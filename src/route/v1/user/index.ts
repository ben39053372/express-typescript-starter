import { Router } from 'express'
import UserService from '../../../services/user.service'
import Container from 'typedi'

const user = Router() // baseUrl: /user

user.get('/', (req, res, next) => {
  res.send(`[${req.baseUrl}] Hello Express Typescript Starter, Now: ${new Date()}`)
})

user.get('/:id', (req, res, next) => {
  res.send('get user by id')
})

user.post('/', async (req, res, next) => {
  try {
    console.log('called')
    let userDTO = req.body;
    let UserServiceInstance = Container.get(UserService);
    let result = await UserServiceInstance.createUser(userDTO)
    res.json({
      result
    })
  } catch (err) {
    throw next(err)
  }

})

user.put('/:id', (req, res, next) => {
  res.send('edit a user data')
})

user.delete('/:id', (req, res, next) => {
  res.send('delete a user')
})

export default user