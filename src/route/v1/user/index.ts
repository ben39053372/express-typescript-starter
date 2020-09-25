import { Router } from 'express'
import UserService from '../../../services/user.service'
import Container from 'typedi'
import { celebrate, Joi, Segments } from 'celebrate'
import { userDTOSchema } from '../../../models/user.model'

const user = Router() // baseUrl: /user

// get all user
user.get('/', async (req, res, next) => {
  try {
    let UserServiceInstance = Container.get(UserService);
    let resultUsers = await UserServiceInstance.getAll()
    res.json(resultUsers)
  } catch (err) {
    next(err)
  }
})

// get user by id
user.get('/:id', celebrate({
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().uuid().required().trim()
  })
}), async (req, res, next) => {
  try {
    let UserServiceInstance = Container.get(UserService);
    let resultUser = await UserServiceInstance.getUserById(req.params.id)
    res.json(resultUser)
  } catch (err) {
    next(err)
  }
})

// create new user
user.post('/', celebrate({
  [Segments.BODY]: userDTOSchema
}), async (req, res, next) => {
  try {
    let userDTO = req.body;
    let UserServiceInstance = Container.get(UserService);
    let createdUser = await UserServiceInstance.createUser(userDTO)
    res.json({ createdUser })
  } catch (err) {
    next(err)
  }

})

/**
* @TODO implement edit user function
*/
user.put('/:id', (req, res, next) => {
  res.send('edit a user data')
})

/**
* @TODO implement delete user function
*/
user.delete('/:id', (req, res, next) => {
  res.send('delete a user')
})

export default user