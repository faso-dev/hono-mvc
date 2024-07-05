import {Context} from 'hono';
import {AbstractController} from "../core/http/index.js";
import {CategoryRepository} from "../repositories/index.js";


class CategoryCrud extends AbstractController{
    async list(c: Context) {
        const categories = await CategoryRepository.findAll();
        return this.json(c,{
            items: categories
        });
    }
    
    async read(c: Context) {
        const category = await CategoryRepository.findById(parseInt(c.req.param('id')));
        return this.json(c,{
            item: category
        });
    }
    
    async create(c: Context) {
        const category = await CategoryRepository.create(await c.req.json());
        return this.json(c,{
            item: category
        }, 201);
    }
    
    async update(c: Context) {
        const category = await CategoryRepository.update(parseInt(c.req.param('id')), await c.req.json());
        return this.json(c,{
            item: category
        });
    }
    
    async delete(c: Context) {
        await CategoryRepository.delete(parseInt(c.req.param('id')));
        return this.json(c,null, 204)
    }
}


const CategoryController = new CategoryCrud();

export {CategoryController}
