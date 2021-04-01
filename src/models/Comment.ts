import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne, OneToMany,
} from 'typeorm';
import { Like } from './Likes';
import { Post } from './Post';
import { User } from './User';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE' })
  user: User;

  @OneToMany(() => Like, (like) => like.comment, { onDelete: 'CASCADE' })
  likes: Like[];

  @ManyToOne(() => Post, (posts) => posts.comments, { onDelete: 'CASCADE' })
  post: Post;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
