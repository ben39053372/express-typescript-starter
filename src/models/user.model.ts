import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";
import { IUser } from '../interfaces/user.t'

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
