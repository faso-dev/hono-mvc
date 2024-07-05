import {AbstractSeeder} from "../core/seeder/index.js";
import {CategoryRepository, PostRepository} from "../repositories/index.js";
import {IPost} from "../types/index.js";
import {slugify} from "../utils/index.js";


class PostSeeder extends AbstractSeeder {
    async run(): Promise<void> {
        const categories = await CategoryRepository.findAll();
        // create 100 posts
        const posts = [] as IPost[];
        for (let i = 0; i < 100; i++) {
            const category_id = this.fakerInstance.helpers.arrayElement(categories).id;
            let name = this.fakerInstance.commerce.productName();
            // ensure that the name is unique
            while (posts.some(post => post.title === name)) {
                name = this.fakerInstance.commerce.productName();
            }
            
            
            posts.push({
                title: name,
                content: this.fakerInstance.lorem.text(),
                category_id,
                slug: slugify(name),
                excerpt: this.fakerInstance.lorem.sentence(),
            });
        }
        
        await PostRepository.createMany(posts);
    }
    
    notifyStart(): void {
        console.log('Seeding posts...');
    }
    
    notifyEnd(): void {
        console.log('Posts seeded.');
    }
}


const PostSeederCommand = new PostSeeder();

export {PostSeederCommand};
