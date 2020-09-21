import { EntityRepository, Repository } from 'typeorm'
import UserModel from '../models/user.model'
import { Service } from 'typedi'
import { IUserInputDTO } from '../interfaces/user.t'

@Service()
@EntityRepository(UserModel)
export default class UserRepository extends Repository<UserModel> {

  async findByUsername(username: string): Promise<UserModel> {
    return await this.findOneOrFail({ username })
  }

  async checkEmailOrUsername(email: string, username: string): Promise<boolean> {
    return !! await this.findOne({
      where: [
        { email },
        { username }
      ]
    })
  }

  async createUser(userDTO: IUserInputDTO) {
    let newUser = this.create()
    newUser.email = userDTO.email;
    newUser.username = userDTO.username;
    newUser.password = userDTO.password;
    return await this.save(newUser)
  }
}