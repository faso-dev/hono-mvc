import {database} from "../config/database.js";
import {AbstractCommand} from "../core/command/index.js";


class MigrateDatabaseCommandImpl extends AbstractCommand {
    async execute(args?: string[]): Promise<void> {
        try {
            await database.authenticate();
            console.log('Connection has been established successfully.');
            console.log('Synchronizing models with database...');
            // Synchronize models with database
            await database.sync({force: false});
            console.log('Database synchronized');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
}


const MigrateDatabaseCommand = new MigrateDatabaseCommandImpl()
export {MigrateDatabaseCommand}
