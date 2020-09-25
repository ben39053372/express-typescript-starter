import { Service } from "typedi";
import Category from '../models/category.model'

import { EntityRepository, TreeRepository } from 'typeorm';

@Service()
@EntityRepository(Category)
export default class CategoryRepository extends TreeRepository<Category> {

  async add(name: string, parentId: number | undefined) {
    let newCategory = new Category()
    newCategory.name = name;
    if (!!parentId) {
      let parentNode = await this.findOne(parentId)
      newCategory.parent = parentNode!
    }
    return await this.save(newCategory)
  }

}