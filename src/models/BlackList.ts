import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('black_list')
export class BlackList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;
}
