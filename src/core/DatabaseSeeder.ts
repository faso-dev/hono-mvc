import {AbstractSeeder} from "../seeders/index.js";

interface Seeder {
    name: string;
    command: AbstractSeeder;
}

class DatabaseSeeder {
    
    private _seeders: Seeder[];
    
    constructor(seeders: Seeder[]) {
        this._seeders = seeders;
    }
    
    async run_seeder(name: string): Promise<void> {
        
        const seeder = this._seeders[name as any];
        
        if (!seeder) {
            throw new Error(`Seeder ${name} not found.`);
        }
        
        seeder.command.notifyStart()
        await seeder.command.run();
        seeder.command.notifyEnd();
    }
    
    async run(): Promise<void> {
        for (const seeder of this._seeders) {
            seeder.command.notifyStart();
            await seeder.command.run();
            seeder.command.notifyEnd();
        }
    }
    
}

export {DatabaseSeeder};
