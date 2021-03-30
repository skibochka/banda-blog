import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { Comment } from './Comment';
import { User } from './User';

@Entity('comment_likes')
export class CommentLike {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.commentLikes)
  user: User;

  @ManyToOne(() => Comment, (comment) => comment.likes)
  comment: Comment;
}
