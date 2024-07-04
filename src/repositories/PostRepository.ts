import {Post} from "../models/index.js";
import {IPost} from "../types/index.js";


class PostRepository {
    static async findAll() {
        return await Post.findAll();
    }
    
    static async findById(id: number) {
        return await Post.findByPk(id);
    }
    
    static async create(post: IPost) {
        return await Post.create(post);
    }
    
    static async createMany(posts: IPost[]) {
        return await Post.bulkCreate(posts);
    }
    
    static async update(id: number, post: Partial<IPost>) {
        await Post.update(post, {
            where: { id }
        });
        return this.findById(id);
    }
    
    static async delete(id: number) {
        return await Post.destroy({
            where: { id }
        });
    }
}

export {PostRepository}
