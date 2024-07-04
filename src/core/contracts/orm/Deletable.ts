export interface Deletable<T> {
    delete: (id: any) => Promise<any>;
    bulkDelete: (ids: any[]) => Promise<any>;
}
