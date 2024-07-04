import {CategoryRepository} from "../repositories/index.js";
import {Context} from 'hono';


class CategoryCrud {
    async getAllCategorys(c: Context) {
        const categories = await CategoryRepository.findAll();
        return c.json({
            items: categories
        });
    }
    
    async getCategoryById(c: Context) {
        const category = await CategoryRepository.findById(parseInt(c.req.param('id')));
        return c.json({
            item: category
        });
    }
    
    async createCategory(c: Context) {
        const category = await CategoryRepository.create(await c.req.json());
        return c.json({
            item: category
        }, 201);
    }
    
    async updateCategory(c: Context) {
        const category = await CategoryRepository.update(parseInt(c.req.param('id')), await c.req.json());
        return c.json({
            item: category
        });
    }
    
    async deleteCategory(c: Context) {
        await CategoryRepository.delete(parseInt(c.req.param('id')));
        return c.json(null, 204)
    }
}


const CategoryController = new CategoryCrud();

export {CategoryController}
