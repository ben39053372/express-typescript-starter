import bcrypt from 'bcrypt'
import { IUser } from '../interfaces/user.t';

/**
* return the hash password with salt
* @param password string
*/
export const hashPassword = (password: string): string => {
  // gen a salt
  let salt = bcrypt.genSaltSync(5);
  // hash the password
  let hashedPassword = bcrypt.hashSync(password, salt)
  return hashedPassword
}

/**
 * check password is correct
 * @param password string
 * @param userData User
 */
export const isPasswordCorrrect = (password: string, userData: IUser): boolean => {
  return bcrypt.compareSync(password, userData.password)
}