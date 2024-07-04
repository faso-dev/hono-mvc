import {Category} from "../models/index.js";
import {ICategory} from "../types/index.js";


class CategoryRepository {
    static async findAll() {
        return await Category.findAll();
    }
    
    static async findById(id: number) {
        return await Category.findByPk(id);
    }
    
    static async create(data: ICategory) {
        return await Category.create(data);
    }
    
    static async createMany(data: ICategory[]) {
        return await Category.bulkCreate(data);
    }
    
    static async update(id: number, data: Partial<ICategory>) {
        await Category.update(data, {
            where: {id}
        });
        return this.findById(id);
    }
    
    static async delete(id: number) {
        return await Category.destroy({
            where: {id}
        });
    }
}


export {CategoryRepository}
