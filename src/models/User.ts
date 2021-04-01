import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany, JoinColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Post } from './Post';
import { Like } from './Likes';
import { CommentLike } from './CommentLike';
import { Comment } from './Comment';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: false })
    isAdmin: boolean;

    @Column({ unique: true })
    login: string;

    @Column()
    password: string;

    @OneToMany(() => Post, (post) => post.user, { onDelete: 'CASCADE' })
    posts: Post[]

    @OneToMany(() => Like, (like) => like.user, { onDelete: 'CASCADE' })
    likes: Like[]

    @OneToMany(() => Comment, (comment) => comment.user, { onDelete: 'CASCADE' })
    comments: Comment[]

    @OneToMany(() => CommentLike, (commentLike) => commentLike.user, { onDelete: 'CASCADE' })
    commentLikes: CommentLike[]

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
