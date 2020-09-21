import { Service, Inject } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions'
import UserRepository from '../../repository/user.repository';
import { IUserInputDTO } from '../../interfaces/user.t';
import { hashPassword } from '../password.service'
import { EmailService } from '../email.service'
import { emailType } from '../../interfaces/email.t';

@Service()
export default class UserService {
  constructor(
    @InjectRepository()
    private userRepository: UserRepository,

    private emailService: EmailService
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
    // create user
    userDTO.password = hashPassword(userDTO.password)
    let createdUser = await this.userRepository.createUser(userDTO)

    if (createdUser) {
      this.emailService.send(emailType.createUserEmail, createdUser.email)
    }
    return {
      result: createdUser
    }
  }
}