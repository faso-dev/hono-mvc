import fs from 'fs';
import path from 'path';
import {Sequelize} from 'sequelize';

// Utilisez le chemin du volume monté dans le conteneur
const dbPath = process.env.DATABASE_PATH || path.resolve('/app/data', 'database.sqlite');

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
    
    async function bootDatabase() {
        try {
            await database.authenticate();
            console.log('Connection has been established successfully.');
            
            // Synchronize models with database
            await database.sync({force: false});
            
            console.log('Database synchronized');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
    
    void bootDatabase();
    
    return database;
}

const database = initializeDatabase();

export {database}
