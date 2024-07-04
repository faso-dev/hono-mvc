import {AbstractSeeder} from "../core/seeder/index.js";
import {CategoryRepository, PostRepository} from "../repositories/index.js";


class PostSeeder extends AbstractSeeder {
    async run(): Promise<void> {
        const categories = await CategoryRepository.findAll();
        // create 100 posts
        const posts = [];
        for (let i = 0; i < 100; i++) {
            let category_id = this.fakerInstance.helpers.arrayElement(categories).id;
            
            posts.push({
                title: this.fakerInstance.commerce.productName(),
                content: this.fakerInstance.lorem.paragraph(),
                category_id,
                slug: this.fakerInstance.lorem.slug(),
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
