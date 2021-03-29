import * as express from 'express';
import * as eah from 'express-async-handler';
import {
  createComment,
  createPost,
  deletePost,
  getPost,
  getPosts,
  likePost,
  updatePost,
  deleteComment, updateComment, likeComment, getComments,
} from '../controllers/postController';
import { sampleMiddleware } from '../middlewares/sampleMiddleware';

const postRouter = express.Router();

postRouter.use(eah(sampleMiddleware));

postRouter.get('/', eah(getPosts));

postRouter.get('/get', eah(getPost));

postRouter.get('/comments', eah(getComments));

postRouter.post('/create', eah(createPost));

postRouter.post('/like', eah(likePost));

postRouter.delete('/delete', eah(deletePost));

postRouter.put('/update', eah(updatePost));

postRouter.post('/comment', eah(createComment));

postRouter.delete('/comment/delete', eah(deleteComment));

postRouter.put('/comment/update', eah(updateComment));

postRouter.post('/comment/like', eah(likeComment));

export default postRouter;
