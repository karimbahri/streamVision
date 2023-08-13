import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  fullName!: string;

  @Column()
  userName!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  birthday!: string;

  @Column({ nullable: true })
  isAdmin!: boolean;
}
