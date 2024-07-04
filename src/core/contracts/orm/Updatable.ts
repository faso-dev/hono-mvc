export interface Updatable<T> {
    update : (id: any, data: any) => Promise<T|null>;
}
