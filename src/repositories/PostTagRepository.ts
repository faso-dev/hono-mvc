import {ManyToManyDeletable, Writable} from "../core/contracts/orm/index.js";
import {PostTag} from "../models/index.js";
import {IPostTag} from "../types/index.js";


class PostTagRepositoryImpl implements Writable<PostTag>, ManyToManyDeletable<PostTag> {
    async create(post: IPostTag) {
        return await PostTag.create(post);
    }
    
    async createMany(posts: IPostTag[]) {
        return await PostTag.bulkCreate(posts);
    }
    
    delete(postId: any, tagId: any) {
        return PostTag.destroy({
            where: {
                post_id: postId,
                tag_id: tagId
            }
        });
    }
    
    bulkDelete(postId: any, tagIds: any[]) {
        return PostTag.destroy({
            where: {
                post_id: postId,
                tag_id: tagIds
            }
        });
    }
}


const PostTagRepository = new PostTagRepositoryImpl();

export {PostTagRepository}
