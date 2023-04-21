import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Shows extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "bytea", nullable: true })
  content!: Buffer;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column()
  rating!: string;
}
