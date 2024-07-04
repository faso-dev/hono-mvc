import {Deletable, Selectable, Updatable, Writable} from "../core/contracts/orm/index.js";
import {Tag} from "../models/index.js";
import {ITag} from "../types/index.js";


class TagRepositoryImpl implements Selectable<Tag>, Writable<Tag>, Updatable<Tag>, Deletable<Tag> {
    async findAll() {
        return await Tag.findAll();
    }
    
    async findById(id: number) {
        return await Tag.findByPk(id);
    }
    
    findBy(field: string, value: any) {
        return Tag.findAll({
            where: {
                [field]: value
            }
        })
    }
    
    async create(post: ITag) {
        return await Tag.create(post);
    }
    
    async createMany(posts: ITag[]) {
        return await Tag.bulkCreate(posts);
    }
    
    async update(id: number, post: Partial<ITag>) {
        await Tag.update(post, {
            where: {id}
        });
        return this.findById(id);
    }
    
    async delete(id: number) {
        return await Tag.destroy({
            where: {id}
        });
    }
    
    bulkDelete(ids: any[]) {
        return Tag.destroy({
            where: {
                id: ids
            }
        });
    }
}

const TagRepository = new TagRepositoryImpl();

export {TagRepository}
