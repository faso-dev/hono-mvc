import {CategorySeederCommand, PostSeederCommand, PostTagSeederCommand, TagSeederCommand} from "../seeders/index.js";
import {DatabaseSeeder} from "../core/DatabaseSeeder.js";


class SeedDatabaseHandler {
    name: string;
    description: string;
    seeder: DatabaseSeeder;
    
    constructor() {
        this.name = 'seed:database';
        this.description = 'Seed the database with some dummy data';
        this.seeder = new DatabaseSeeder([
            {
                name: 'tags',
                command: TagSeederCommand
            },
            {
                name: 'categories',
                command: CategorySeederCommand
            },
            {
                name: 'posts',
                command: PostSeederCommand
            },
            {
                name: 'posts_tags',
                command: PostTagSeederCommand
            }
        ])
    }
    
    async handle(args: string[]) {
        const specificSeeder = args.find(arg => arg.startsWith('--'));
        
        if (specificSeeder) {
            const seederName = specificSeeder.slice(2);
            await this.seeder.run_seeder(seederName);
        } else {
            console.log('Seeding the database...');
            await this.seeder.run(); // run all seeders
            console.log('Database seeded.');
        }
    }
}


const SeedDatabaseCommand = new SeedDatabaseHandler()

export {SeedDatabaseCommand}
