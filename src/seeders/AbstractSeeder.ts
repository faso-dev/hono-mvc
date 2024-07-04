import {faker} from "@faker-js/faker";


abstract class AbstractSeeder {
    protected fakerInstance = faker;
    
    abstract run(): Promise<void>;
    abstract notifyStart(): void;
    abstract notifyEnd(): void;
}

export {AbstractSeeder};
