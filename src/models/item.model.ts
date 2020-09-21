import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export default class item {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  detail!: string;
}
