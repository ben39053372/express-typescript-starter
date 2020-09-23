import expressJWT from 'express-jwt'
import config from '../config'

const unlessRoute = [
  '/api/*/auth/login',
  { url: '/api/*/user', methods: ['GET'] }
]

export default expressJWT({
  secret: config.JWT_SECRET as string,
  algorithms: ['HS256']
}).unless({
  path: unlessRoute,
  method: 'OPTIONS'
})