import {PostRepository} from  "../repositories/index.js";
import { Context } from 'hono';

class PostCrud {
    async getAllPosts(c: Context) {
        console.log('getAllPosts')
        const posts = await PostRepository.findAll();
        return c.json({
            items: posts
        });
    }
    
    async getPostById(c: Context) {
        const post = await PostRepository.findById(parseInt(c.req.param('id')));
        return c.json({
            item: post
        });
    }
    
    async createPost(c: Context) {
        const post = await PostRepository.create(await c.req.json());
        return c.json({
            item: post
        }, 201);
    }
    
    async updatePost(c: Context) {
        const post = await PostRepository.update(parseInt(c.req.param('id')), await c.req.json());
        return c.json({
            item: post
        });
    }
    
    async deletePost(c: Context) {
        await PostRepository.delete(parseInt(c.req.param('id')));
        return c.json(null, 204)
    }
}

const PostController = new PostCrud();

export {PostController}
