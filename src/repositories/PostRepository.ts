import {Deletable, Selectable, Updatable, Writable} from "../core/contracts/orm/index.js";
import {Post} from "../models/index.js";
import {IPost} from "../types/index.js";


class PostRepositoryImpl implements Selectable<Post>, Writable<Post>, Updatable<Post>, Deletable<Post> {
    async findAll() {
        return await Post.findAll();
    }
    
    async findById(id: number) {
        return await Post.findByPk(id);
    }
    
    findBy(field: string, value: any) {
        return Post.findAll({
            where: {
                [field]: value
            }
        })
    }
    
    async create(post: IPost) {
        return await Post.create(post);
    }
    
    async createMany(posts: IPost[]) {
        return await Post.bulkCreate(posts);
    }
    
    async update(id: number, post: Partial<IPost>) {
        await Post.update(post, {
            where: {id}
        });
        return this.findById(id);
    }
    
    async delete(id: number) {
        return await Post.destroy({
            where: {id}
        });
    }
    
    bulkDelete(ids: any[]) {
        return Post.destroy({
            where: {
                id: ids
            }
        });
    }
}


const PostRepository = new PostRepositoryImpl();

export {PostRepository}
