import {PostTag} from "../models/index.js";
import {IPostTag} from "../types/index.js";


class PostTagRepository {
    static async findAll() {
        return await PostTag.findAll();
    }
    
    static async findById(id: number) {
        return await PostTag.findByPk(id);
    }
    
    static async create(post: IPostTag) {
        return await PostTag.create(post);
    }
    
    static async createMany(posts: IPostTag[]) {
        return await PostTag.bulkCreate(posts);
    }
}


export {PostTagRepository}
