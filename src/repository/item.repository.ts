import { EntityRepository, Repository } from 'typeorm'
import ItemModel from '../models/item.model'
import { Service } from 'typedi'

@Service()
@EntityRepository(ItemModel)
export default class UserRepository extends Repository<ItemModel> {

}