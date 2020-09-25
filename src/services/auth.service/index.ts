import { Service, Inject } from 'typedi'
import jwt from 'jsonwebtoken'
import UserRepository from '../../repository/user.repository'
import config from '../../config'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { isPasswordCorrrect } from '../password.service'

const genToken = (payload: object | undefined): string => {
  return 'Bearer ' + jwt.sign({ ...payload }, <string>config.JWT_SECRET, {
    algorithm: 'HS256'
  });
}

@Service()
export default class AuthService {

  constructor(
    @InjectRepository() private userRepository: UserRepository
  ) { }

  async login(loginName: string, saltedPassword: string) {
    try {
      // check user exist
      let user = await this.userRepository.findOneOrFail({
        where: [
          { username: loginName },
          { email: loginName }
        ]
      })

      // check password correct
      if (isPasswordCorrrect(saltedPassword, user)) {
        let token = genToken({ username: user.username, email: user.email })
        return { token }
      } else {
        throw {
          status: 401
        }
      }

    } catch (err) {
      throw {
        status: 404,
        message: "User not found"
      }
    }

  }

  logout(username: string) {

  }

  forgotPassword(username: string, email: string) {

  }

}