interface IRepository<T extends Object, S> {
    create(t: T): Promise<S>;
    exists(key: any): Promise<Boolean>;
    listAll(): Promise<S[]>;
}

export { IRepository };
