import { Service, Inject } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions'
import UserRepository from '../../repository/user.repository';
import { IUserDTO } from '../../models/user.model';
import { hashPassword } from '../password.service'
import { EmailService } from '../email.service'
import { emailType } from '../../interfaces/email.t';

@Service()
export default class UserService {

  @InjectRepository()
  public userRepository!: UserRepository

  @Inject()
  private emailService!: EmailService

  async getAll() {
    let userList = await this.userRepository.find()
    return userList.map(user => user.basicInfo)
  }

  async getUserById(id: string) {
    let userResult = await this.userRepository.findOne({ id })
    if (userResult) return userResult.basicInfo
    throw {
      status: 404,
      message: 'user not found'
    }
  }

  async isUserRegistered(userDTO: IUserDTO) {
    return await this.userRepository.isUserExist(userDTO)
  }

  // create user with { email, username, saltedPassword }
  async createUser(userDTO: IUserDTO) {
    try {
      // check user info exist
      let isExist = await this.userRepository.isUserExist(userDTO)
      if (isExist) throw {
        status: 409,
        message: 'Email or Username are used.'
      }

      // create user
      userDTO.password = hashPassword(userDTO.password)
      let createdUser = await this.userRepository.insertUser(userDTO)

      // If success, send email
      if (createdUser) {
        this.emailService.send(emailType.createUserEmail, createdUser.email)
      }

      // return basic info
      return createdUser.basicInfo

    } catch (err) {
      throw err
    }
  }
}