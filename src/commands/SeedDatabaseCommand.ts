import {database} from "../config/database.js";
import {AbstractCommand} from "../core/command/index.js";
import {DatabaseCleaner} from "../core/database/index.js";
import {DatabaseSeeder} from "../core/seeder/index.js";
import {CategorySeederCommand, PostSeederCommand, PostTagSeederCommand, TagSeederCommand} from "../seeders/index.js";


class SeedDatabaseCommandImpl extends AbstractCommand {
    seeder: DatabaseSeeder;
    _databaseCleaner: DatabaseCleaner;
    
    constructor() {
        super();
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
        this._databaseCleaner = new DatabaseCleaner(database);
    }
    
    async execute(args: string[]) {
        const specificSeeder = args.find(arg => arg.startsWith('--'));
        
        if (specificSeeder) {
            const seederName = specificSeeder.slice(2);
            await this.seeder.run_seeder(seederName);
        } else {
            console.log('Cleaning the database...');
            await this._databaseCleaner.clean(); // clean the database
            console.log('Seeding the database...');
            await this.seeder.run(); // run all seeders
            console.log('Database seeded.');
        }
    }
}


const SeedDatabaseCommand = new SeedDatabaseCommandImpl()

export {SeedDatabaseCommand}
