import expressJWT from 'express-jwt'
import config from '../config'

const unlessRoute = [
  { url: /\/api\/.*\/auth\/login/, methods: ['POST'] },
  { url: /\/api\/.*\/user/, methods: ['POST'] }
]

export default expressJWT({
  secret: config.JWT_SECRET as string,
  algorithms: ['HS256']
}).unless({
  path: unlessRoute
})