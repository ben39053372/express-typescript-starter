import { EntityRepository, Repository } from 'typeorm'
import UserModel from '../models/user.model'
import { Service } from 'typedi'

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
}