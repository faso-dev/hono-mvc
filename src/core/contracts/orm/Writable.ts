export interface Writable<T> {
    create : (data: any) => Promise<T>;
    createMany : (data: any[]) => Promise<T[]>;
}
