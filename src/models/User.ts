import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Post } from './Post';
import { Like } from './Likes';
import { CommentLike } from './CommentLike';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: false })
    isAdmin: boolean;

    @Column({ unique: true })
    login: string;

    @Column()
    password: string;

    @OneToMany(() => Post, (post) => post.userId)
    posts: Post[]

    @OneToMany(() => Like, (like) => like.userId)
    likes: Like[]

    @OneToMany(() => CommentLike, (commentLike) => commentLike.userId)
    commentLikes: Post[]

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
