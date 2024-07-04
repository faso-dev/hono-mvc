import {Sequelize} from 'sequelize';
import fs from 'fs';
import path from 'path';


const dbPath = path.resolve(process.cwd(), 'database.sqlite');

export function initializeDatabase() {
    if (!fs.existsSync(dbPath)) {
        console.log('Creating new database file.');
        fs.writeFileSync(dbPath, '');
    }
    
    const database = new Sequelize({
        dialect: 'sqlite',
        storage: dbPath,
        logging: false // set to console.log to see the SQL queries
    });
    
    return database;
}

const database = initializeDatabase();

export {database}
