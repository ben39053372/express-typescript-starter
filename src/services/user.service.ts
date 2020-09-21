import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions'
import UserRepository from '../repository/user.repository';
import { IUserInputDTO } from '../interfaces/user.t';
import User from '../models/user.model';
import { hashPassword } from './password.service'

@Service()
export default class UserService {
  constructor(
    @InjectRepository()
    private userRepository: UserRepository
  ) { }

  /**
   * create a user
   */
  async createUser(userDTO: IUserInputDTO) {
    // check email and username
    if (await this.userRepository.checkEmailOrUsername(userDTO.email, userDTO.username)) {
      throw {
        status: 400,
        message: 'Email or Username are used.'
      }
    }
    // start create process
    let hashedPassword = hashPassword(userDTO.password)
    let newUser = new User()
    newUser.email = userDTO.email
    newUser.username = userDTO.username
    newUser.password = hashedPassword
    let result = await this.userRepository.save(newUser)
    return {
      result
    }
  }
}