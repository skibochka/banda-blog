import * as express from 'express';
import * as eah from 'express-async-handler';
import {
  createPost,
  deletePost,
  getPost,
  likePost,
  updatePost,
} from '../controllers/postController';
import { sampleMiddleware } from '../middlewares/sampleMiddleware';

const postRouter = express.Router();

postRouter.use(eah(sampleMiddleware));

postRouter.post('/post', eah(createPost));

postRouter.get('/post/get', eah(getPost));

postRouter.post('/post/like', eah(likePost));

postRouter.delete('/post/delete', eah(deletePost));

postRouter.put('/post/update', eah(updatePost));


export default postRouter;
