import {AbstractCommand} from "../core/command/index.js";
import {DatabaseSeeder} from "../core/seeder/index.js";
import {CategorySeederCommand, PostSeederCommand, PostTagSeederCommand, TagSeederCommand} from "../seeders/index.js";


class SeedDatabaseCommandImpl extends AbstractCommand {
    name: string;
    description: string;
    seeder: DatabaseSeeder;
    
    constructor() {
        super();
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
    
    async execute(args: string[]) {
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


const SeedDatabaseCommand = new SeedDatabaseCommandImpl()

export {SeedDatabaseCommand}
