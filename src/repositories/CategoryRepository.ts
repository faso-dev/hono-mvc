import {Deletable, Selectable, Updatable, Writable} from "../core/contracts/orm/index.js";
import {Category} from "../models/index.js";
import {ICategory} from "../types/index.js";


class CategoryRepositoryImpl implements Selectable<Category>, Writable<Category>, Updatable<Category>, Deletable<Category> {
    async findAll() {
        return await Category.findAll();
    }
    
    async findById(id: number) {
        return await Category.findByPk(id);
    }
    
    async create(data: ICategory) {
        return await Category.create(data);
    }
    
    async createMany(data: ICategory[]) {
        return await Category.bulkCreate(data);
    }
    
    async update(id: number, data: Partial<ICategory>) {
        await Category.update(data, {
            where: {id}
        });
        return this.findById(id);
    }
    
    async delete(id: number): Promise<number> {
        return await Category.destroy({
            where: {id}
        });
    }
    
    bulkDelete(ids: any[]): Promise<any> {
        return Category.destroy({
            where: {
                id: ids
            }
        });
    }
    
    findBy(field: string, value: any){
        return Category.findAll({
            where: {
                [field]: value
            }
        })
    }
}


const CategoryRepository = new CategoryRepositoryImpl();

export {CategoryRepository}
