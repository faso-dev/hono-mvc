#!/usr/bin/env node


import {SeedDatabaseCommand} from "./commands/index.js";


const [,, ...args] = process.argv;

const command = args[0];

if (command === 'database:seed') {
    void SeedDatabaseCommand.handle(args.slice(1));
} else {
    console.error('Unknown command');
}
