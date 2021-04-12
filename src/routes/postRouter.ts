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
  deleteComment,
  updateComment,
  likeComment,
  getComments,
} from '../controllers/postController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { validatorMiddleware } from '../middlewares/validatorMiddleware';
import { postSchemas } from '../validation/postSchemas';
import cacheMiddleware from '../middlewares/cacheMiddleware';

const postRouter = express.Router();

postRouter.get('/', validatorMiddleware(postSchemas.getPosts), eah(getPosts));

postRouter.get('/get', validatorMiddleware(postSchemas.checkPostId), eah(cacheMiddleware), eah(getPost));

postRouter.get('/comments', validatorMiddleware(postSchemas.checkPostId), eah(getComments));

postRouter.use(eah(authMiddleware));

postRouter.post('/create', validatorMiddleware(postSchemas.checkPostInput), eah(createPost));

postRouter.post('/like', validatorMiddleware(postSchemas.checkPostId), eah(likePost));

postRouter.delete('/delete', validatorMiddleware(postSchemas.checkPostId), eah(deletePost));

postRouter.put('/update', validatorMiddleware(postSchemas.updatePost), eah(updatePost));

postRouter.post('/comment', validatorMiddleware(postSchemas.checkCommentInput), eah(createComment));

postRouter.delete('/comment/delete', validatorMiddleware(postSchemas.checkCommentId), eah(deleteComment));

postRouter.put('/comment/update', validatorMiddleware(postSchemas.updateComment), eah(updateComment));

postRouter.post('/comment/like', validatorMiddleware(postSchemas.checkCommentId), eah(likeComment));

export default postRouter;
