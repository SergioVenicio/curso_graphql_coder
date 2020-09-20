export interface IdParam {
    id: String;
}

export default interface Resolver<T> {
    get(_: any, { id }: IdParam): T | undefined;
    list(): T[];
    add(args: T): T;
    delete(args: T): T | undefined;
    update(args: T): T | undefined;
}
