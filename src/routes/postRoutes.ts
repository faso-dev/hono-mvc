import {PostController} from "../controllers/index.js";
import {Hono} from "hono";


const postRoutes = new Hono().basePath('/posts');

postRoutes.get('', (c) => PostController.getAllPosts(c));
postRoutes.post('', (c) => PostController.createPost(c));
postRoutes.get('/:id', (c) => PostController.getPostById(c));
postRoutes.put('/:id', (c) => PostController.updatePost(c));
postRoutes.delete('/:id', (c) => PostController.deletePost(c));

export {postRoutes}
