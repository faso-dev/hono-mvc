export interface ManyToManyDeletable<T> {
    delete: (id: any, relatedId: any) => Promise<any>;
    bulkDelete: (id: any, relatedIds: any[]) => Promise<any>;
}
