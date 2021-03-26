import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class BlackList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;
}
