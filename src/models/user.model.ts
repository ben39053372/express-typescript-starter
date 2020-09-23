import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";
import { Joi } from 'celebrate'

@Entity()
export default class User implements IUser {

  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  username!: string;

  @Column()
  password!: string;

  @Column()
  email!: string;

  @CreateDateColumn()
  createDate!: Date

  @Column({
    default: true
  })
  active!: boolean;
}


export interface IUserDTO {
  username: string;
  password: string;
  email: string;
}

export interface IUser extends IUserDTO {
  id: string;
  active: boolean;
}

export interface IUserLogin {
  loginName: string;
  saltedPassword: string;
}

export const userDTOSchema = Joi.object({
  username: Joi.string().max(255).trim(),
  password: Joi.string().max(255).trim(),
  email: Joi.string().email().trim()
})

export const userLoginSchema = Joi.object({
  loginName: Joi.string().trim().required(),
  saltedPassword: Joi.string().trim().required()
})