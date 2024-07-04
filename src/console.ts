#!/usr/bin/env node


import {MigrateDatabaseCommand, SeedDatabaseCommand} from "./commands/index.js";
import {Console} from "./core/console/index.js";


const [,, ...args] = process.argv;

const command = args[0];

Console.addCommands([
    {
        name: 'database:seed',
        description: 'Seed the database with some dummy data',
        command: SeedDatabaseCommand
    },
    {
        name: 'database:migrate',
        description: 'Migrate the database',
        command: MigrateDatabaseCommand
    }
]).handle(
    command,
    args.slice(1)
)
