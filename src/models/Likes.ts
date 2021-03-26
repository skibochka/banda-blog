import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  postID: number;

  @Column()
  userID: number;
}
