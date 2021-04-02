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

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
