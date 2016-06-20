export interface IDatabase<T> {
    getAll(query: any)
    load(id: string)
    update(id: string, model: T)
    create(model: T)
    remove(id: string)
}