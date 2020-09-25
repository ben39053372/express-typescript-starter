import { EntityRepository, Repository } from 'typeorm'
import User from '../models/user.model'
import { Service } from 'typedi'
import { IUserDTO } from '../models/user.model'

@Service()
@EntityRepository(User)
export default class UserRepository extends Repository<User> {

  /**
   * if user exist return true
   * 
   * else return false
   * @param email 
   * @param username 
   */
  async isUserExist(userDTO: IUserDTO): Promise<boolean> {
    return !! await this.findOne({
      where: [
        { email: userDTO.email },
        { username: userDTO.username }
      ]
    })
  }

  /**
   * @param userDTO 
   */
  async insertUser(userDTO: IUserDTO) {
    let newUser = this.create()
    newUser.email = userDTO.email;
    newUser.username = userDTO.username;
    newUser.password = userDTO.password;
    return await this.save(newUser)
  }
}