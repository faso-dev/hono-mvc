import {TagRepository} from  "../repositories/index.js";
import { Context } from 'hono';

class TagCrud {
    async getAllTags(c: Context) {
        const tags = await TagRepository.findAll();
        return c.json({
            items: tags
        });
    }
    
    async getTagById(c: Context) {
        const tag = await TagRepository.findById(parseInt(c.req.param('id')));
        return c.json({
            item: tag
        });
    }
    
    async createTag(c: Context) {
        const tag = await TagRepository.create(await c.req.json());
        return c.json({
            item: tag
        }, 201);
    }
    
    async updateTag(c: Context) {
        const tag = await TagRepository.update(parseInt(c.req.param('id')), await c.req.json());
        return c.json({
            item: tag
        });
    }
    
    async deleteTag(c: Context) {
        await TagRepository.delete(parseInt(c.req.param('id')));
        return c.json(null, 204)
    }
}

const TagController = new TagCrud();

export {TagController}
