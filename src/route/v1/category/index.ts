import { celebrate, Joi, Segments } from 'celebrate'
import { Router, Request, Response, NextFunction, response } from 'express'
import Container from 'typedi'
import { CategoryInsertSchema } from '../../../models/category.model'
import CategoryService from '../../../services/Category.service'

const categoryRoute = Router()

// get category
categoryRoute.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    let categoryServiceInstance = Container.get(CategoryService)
    let category = await categoryServiceInstance.getCachedCategory()
    res.json({
      category: category
    })
  } catch (err) {
    next(err)
  }
})

// create category
categoryRoute.post('/', celebrate({
  [Segments.BODY]: CategoryInsertSchema
}), async (req: Request, res: Response, next: NextFunction) => {
  try {
    let categoryServiceInstance = Container.get(CategoryService)
    let result = await categoryServiceInstance.createCategoryAndCache(req.body.name, req.body.parentId)
    res.json({
      result
    })
  } catch (err) {
    next(err)
  }
})

export default categoryRoute