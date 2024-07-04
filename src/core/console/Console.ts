type CommandDefinition = {
    name: string;
    description: string;
    command: { execute: (args: string[]) => Promise<void> };
};


class CommandRegister {
    private commands: CommandDefinition[] = [];
    
    addCommands(commandDefinitions: CommandDefinition[]): CommandRegister {
        this.commands = commandDefinitions;
        return this;
    }
    
    addCommand(commandDefinition: CommandDefinition): CommandRegister {
        this.commands.push(commandDefinition);
        return this;
    }
    
    handle(commandName: string, args: string[]): void {
        const command = this.commands.find(cmd => cmd.name === commandName);
        
        if (command) {
            console.log(`Executing command: ${command.name}`);
            console.log(`Description: ${command.description}`);
            command.command.execute(args)
                .then(() => console.log(`Command ${command.name} executed successfully.`))
                .catch(error => console.error(`Error executing command ${command.name}:`, error));
        } else {
            console.error('Unknown command');
            this.printAvailableCommands();
        }
    }
    
    private printAvailableCommands(): void {
        console.log('Available commands:');
        this.commands.forEach(cmd => {
            console.log(`  ${cmd.name}: ${cmd.description}`);
        });
    }
}


const Console = new CommandRegister();

export {Console, CommandDefinition}
