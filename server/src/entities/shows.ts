import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Shows extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  content!: string;

  @Column()
  title!: string;

  @Column()
  thumbnail!: string;

  @Column()
  category!: string;

  @Column()
  episodes!: number;

  @Column()
  seasons!: number;
}
