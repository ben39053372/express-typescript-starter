import { Inject, Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import CategoryRepository from "../../repository/category.repository";
import CacheService from "../cache.service";

@Service()
export default class CategoryService {

  @Inject()
  public cacheService!: CacheService

  @InjectRepository()
  public categoryRepository!: CategoryRepository;

  async getCachedCategory() {
    let cachedCategory = await this.cacheService.get('Category')
    if (cachedCategory) return {
      comeFrom: 'cache',
      data: JSON.parse(cachedCategory)
    }
    let category = await this.categoryRepository.findTrees()
    await this.cacheService.set('Category', JSON.stringify(await category))
    if (category) return {
      comeFrom: 'database',
      data: category
    }
    else throw {
      status: 404,
      message: 'Cannot get Category!'
    }
  }

  async createCategoryAndCache(name: string, parentId: number | undefined) {
    let createdCategoryNode = await this.categoryRepository.add(name, parentId)
    await this.cacheService.set('Category', JSON.stringify(await this.categoryRepository.findTrees()))
    return createdCategoryNode
  }

}