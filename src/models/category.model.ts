import { Entity, PrimaryGeneratedColumn, Column, TreeParent, TreeChildren, Tree, PrimaryColumn } from "typeorm";
import { Joi } from 'celebrate'

export interface ICategory {
  id: number;
  parent: ICategory;
  name: string;
  children: ICategory[];
}

export const CategoryInsertSchema = Joi.object({
  name: Joi.string().required().trim(),
  parentId: Joi.number().optional()
})

@Entity()
@Tree("nested-set")
export default class Category implements ICategory {

  @PrimaryGeneratedColumn()
  id!: number;

  @TreeParent()
  parent!: ICategory;

  @Column()
  name!: string;

  @TreeChildren()
  children!: ICategory[];

}