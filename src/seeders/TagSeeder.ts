import {AbstractSeeder} from "../core/seeder/index.js";
import {TagRepository} from "../repositories/index.js";
import {ITag} from "../types/index.js";
import {slugify} from "../utils/index.js";


class TagSeeder extends AbstractSeeder {
    async run(): Promise<void> {
        // create 100 tags
        const tags = [] as ITag[];
        for (let i = 0; i < 15; i++) {
            let name = this.fakerInstance.word.words(1);
            // ensure that the name is unique
            while (tags.some(tag => tag.name === name)) {
                name = this.fakerInstance.word.words(1);
            }
            tags.push({
                name: name,
                slug: slugify(name),
            });
        }
        
        await TagRepository.createMany(tags);
    }
    
    notifyStart(): void {
        console.log('Seeding tags...');
    }
    
    notifyEnd(): void {
        console.log('Tags seeded.');
    }
}


const TagSeederCommand = new TagSeeder();

export {TagSeederCommand};
