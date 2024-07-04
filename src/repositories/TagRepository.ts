import {Tag} from "../models/index.js";
import {ITag} from "../types/index.js";


class TagRepository {
    static async findAll() {
        return await Tag.findAll();
    }
    
    static async findById(id: number) {
        return await Tag.findByPk(id);
    }
    
    static async create(post: ITag) {
        return await Tag.create(post);
    }
    
    static async createMany(posts: ITag[]) {
        return await Tag.bulkCreate(posts);
    }
    
    static async update(id: number, post: Partial<ITag>) {
        await Tag.update(post, {
            where: {id}
        });
        return this.findById(id);
    }
    
    static async delete(id: number) {
        return await Tag.destroy({
            where: {id}
        });
    }
}


export {TagRepository}
