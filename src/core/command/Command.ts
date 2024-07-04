interface Command {
    execute(args?: string[]): Promise<void>;
}


abstract class AbstractCommand implements Command {
    public abstract execute(args?: string[]): Promise<void>;
}

export {Command, AbstractCommand};
