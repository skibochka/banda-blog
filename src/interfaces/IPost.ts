import { Comment } from '../models/Comment';
import { User } from '../models/User';

export interface IPost {
  id: number;

  title: string;

  content: string;

  user: User;

  likes?: number;

  comments: Comment[];

  createdAt: Date;

  updatedAt: Date;
}
