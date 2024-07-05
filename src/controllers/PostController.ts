import {Context} from 'hono';
import {AbstractController} from "../core/http/index.js";
import {PostRepository} from "../repositories/index.js";


class PostCrud extends AbstractController{
    async list(c: Context) {
        console.log('getAllPosts')
        const posts = await PostRepository.findAll();
        return this.json(c,{
            items: posts
        });
    }
    
    async read(c: Context) {
        const post = await PostRepository.findById(parseInt(c.req.param('id')));
        return this.json(c,{
            item: post
        });
    }
    
    async create(c: Context) {
        const post = await PostRepository.create(await c.req.json());
        return this.json(c,{
            item: post
        }, 201);
    }
    
    async update(c: Context) {
        const post = await PostRepository.update(parseInt(c.req.param('id')), await c.req.json());
        return this.json(c,{
            item: post
        });
    }
    
    async delete(c: Context) {
        await PostRepository.delete(parseInt(c.req.param('id')));
        return this.json(c,null, 204)
    }
}

const PostController = new PostCrud();

export {PostController}
