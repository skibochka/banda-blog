import {
  Entity,
  PrimaryGeneratedColumn,
  Column, ManyToOne,
} from 'typeorm';
import { Post } from './Post';
import { User } from './User';

@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.likes)
  userId: User;

  @ManyToOne(() => Post, (post) => post.likes)
  postId: Post;
}
