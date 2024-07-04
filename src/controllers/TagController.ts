import {AbstractController} from "../core/http/index.js";
import {TagRepository} from  "../repositories/index.js";
import { Context } from 'hono';

class TagCrud extends AbstractController{
    async list(c: Context) {
        const tags = await TagRepository.findAll();
        return this.json(c,{
            items: tags
        });
    }
    
    async read(c: Context) {
        const tag = await TagRepository.findById(parseInt(c.req.param('id')));
        return this.json(c,{
            item: tag
        });
    }
    
    async create(c: Context) {
        const tag = await TagRepository.create(await c.req.json());
        return this.json(c,{
            item: tag
        }, 201);
    }
    
    async update(c: Context) {
        const tag = await TagRepository.update(parseInt(c.req.param('id')), await c.req.json());
        return this.json(c,{
            item: tag
        });
    }
    
    async delete(c: Context) {
        await TagRepository.delete(parseInt(c.req.param('id')));
        return this.json(c,null, 204)
    }
}

const TagController = new TagCrud();

export {TagController}
