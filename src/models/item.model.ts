import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Joi } from 'celebrate'

@Entity()
export default class item implements IItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  detail!: string;
}

export interface IItem {
  id: number;
  name: string;
  description: string;
  detail: string;
}

export const itemIdSchema = Joi.string().required()

export const itemSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().max(255),
  description: Joi.string().max(255),
  detail: Joi.string().max(255),
})

export const itemDTOSchema = Joi.object({
  name: Joi.string().max(255),
  description: Joi.string().max(255),
  detail: Joi.string().max(255),
})
