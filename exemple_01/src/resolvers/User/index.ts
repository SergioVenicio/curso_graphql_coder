import User from "../../models/User";
import Resolver, { IdParam } from "../interface";

export default class UserResolver implements Resolver<User> {
    private _users: User[];

    constructor(users: User[] = []) {
        this._users = users;
    }

    public add({ id, name, email, age, authenticated, profile }: User) {
        const newUser = new User(id, name, email, age, authenticated, profile);
        this._users.push(newUser);
    }

    public list(): User[] {
        return this._users as User[];
    }

    public get(_: any, { id }: IdParam): User | undefined {
        return this._users.find((user) => user.id === id);
    }

    public loggedUsers() {
        return this._users.filter(({ authenticated }) => authenticated);
    }
}
