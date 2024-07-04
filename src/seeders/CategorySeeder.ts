import {AbstractSeeder} from "../core/AbstractSeeder.js";
import {CategoryRepository} from "../repositories/index.js";
import {ICategory} from "../types/index.js";
import {slugify} from "../utils/index.js";


class CategorySeeder extends AbstractSeeder {
    async run(): Promise<void> {
        // create 15 categories
        const categories = [] as ICategory[];
        for (let i = 0; i < 15; i++) {
            let name = this.fakerInstance.commerce.department();
            // ensure that the name is unique
            while (categories.some(category => category.name === name)) {
                name = this.fakerInstance.commerce.department();
            }
            categories.push({
                name: name,
                slug: slugify(name),
            });
        }
        
        await CategoryRepository.createMany(categories);
    }
    
    notifyStart(): void {
        console.log('Seeding categories...');
    }
    
    notifyEnd(): void {
        console.log('Categories seeded.');
    }
}

const CategorySeederCommand = new CategorySeeder();

export {CategorySeederCommand};
