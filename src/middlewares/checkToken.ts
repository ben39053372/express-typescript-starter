import { NextFunction } from "express";

import expressJWT from 'express-jwt'
import config from '../config'

const unlessRoute = [

]

export default () => expressJWT({
  secret: config.JWT_SECRET as string,
  algorithms: ['HS256']
}).unless({
  path: ['*/login'],
  method: 'OPTIONS'
})