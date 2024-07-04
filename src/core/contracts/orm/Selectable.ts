export interface Selectable<T> {
    findAll: () => Promise<T[]>;
    findById: (id: any) => Promise<T|null>;
    findBy: (field: string, value: any) => Promise<T[]|null>;
}
