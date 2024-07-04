import {Hono} from "hono";
import {ApiHealthController, CategoryController, PostController, TagController} from "../controllers/index.js";


const api = new Hono().basePath('/api/v1')

// System
api.get('/health', (c) => ApiHealthController.check(c));

// Categories
api.get('/categories', (c) => CategoryController.list(c));
api.get('/categories/:id', (c) => CategoryController.read(c));
api.post('categories', (c) => CategoryController.create(c));
api.put('/categories/:id', (c) => CategoryController.update(c));
api.delete('/categories/:id', (c) => CategoryController.delete(c));

// Tags
api.get('/tags', (c) => TagController.list(c));
api.get('/tags/:id', (c) => TagController.read(c));
api.post('tags', (c) => TagController.create(c));
api.put('/tags/:id', (c) => TagController.update(c));
api.delete('/tags/:id', (c) => TagController.delete(c));

// Posts
api.get('/posts', (c) => PostController.list(c));
api.get('/posts/:id', (c) => PostController.read(c));
api.post('posts', (c) => PostController.create(c));
api.put('/posts/:id', (c) => PostController.update(c));
api.delete('/posts/:id', (c) => PostController.delete(c));

export {api}
