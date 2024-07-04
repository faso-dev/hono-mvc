import {AbstractSeeder} from "../core/AbstractSeeder.js";
import {PostRepository, PostTagRepository, TagRepository} from "../repositories/index.js";


class PostTagSeeder extends AbstractSeeder {
    async run(): Promise<void> {
        const tags = await TagRepository.findAll();
        const posts = await PostRepository.findAll();
        
        const postTags = [];
        for (const post of posts) {
            const tagIds = this.fakerInstance.helpers.arrayElements(tags, {min: 2, max: 5}).map(tag => tag.id);
            for (const tag_id of tagIds) {
                postTags.push({
                    post_id: post.id,
                    tag_id,
                });
            }
        }
        
        await PostTagRepository.createMany(postTags);
    }
    
    notifyStart(): void {
        console.log('Seeding post tags...');
    }
    
    notifyEnd(): void {
        console.log('Post tags seeded.');
    }
}

const PostTagSeederCommand = new PostTagSeeder();

export {PostTagSeederCommand};
