import {
  Entity,
  PrimaryGeneratedColumn,
  Column, ManyToOne,
} from 'typeorm';
import { Comment } from './Comment';
import { User } from './User';

@Entity()
export class CommentLike {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  commentId: number;

  @ManyToOne(() => User, (user) => user.commentLikes)
  userId: User;

  @ManyToOne(() => Comment, (comment) => comment.likes)
  comment: Comment;
}
