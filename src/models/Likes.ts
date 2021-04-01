import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { Post } from './Post';
import { User } from './User';
import { Comment } from './Comment';

@Entity('likes')
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.likes, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Post, (post) => post.likes, { onDelete: 'CASCADE', nullable: true })
  post: Post;

  @ManyToOne(() => Comment, (comment) => comment.likes, { onDelete: 'CASCADE', nullable: true })
  comment: Comment;
}
