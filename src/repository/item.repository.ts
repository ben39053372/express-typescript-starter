import { EntityRepository, Repository } from 'typeorm'
import ItemModel from '../models/item.model'

@EntityRepository(ItemModel)
export default class UserRepository extends Repository<ItemModel> {

}