import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Registration {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  phone: number;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column()
  companyname: string;
}
