import User from "../../models/User";
import Resolver, { IdParam } from "../interface";

export default class UserResolver implements Resolver<User> {
    private _id: number = 0;
    private _users: User[];

    constructor(users: User[] = []) {
        this._users = users;
    }

    public add({
        name,
        email,
        age,
        authenticated,
        profile,
    }: Omit<User, "id">): User {
        const userAlreadyExists = this._users.find(
            (user) => user.email === email
        );

        if (userAlreadyExists) {
            throw new Error("This user already exists!");
        }

        this._id++;
        const parsedId = new String(this._id);
        const newUser = new User(
            parsedId,
            name,
            email,
            age,
            authenticated,
            profile
        );
        this._users.push(newUser);

        return newUser;
    }

    public update({ id, name, email, age, authenticated, profile }: User) {
        const userIndex = this._users.findIndex((user) => user.id == id);
        if (userIndex < 0) {
            return;
        }

        Object.assign(this._users[userIndex], {
            name,
            email,
            age,
            authenticated,
            profile,
        });

        return this._users[userIndex];
    }

    public delete({ id }: IdParam): User | undefined {
        const userIndex = this._users.findIndex((user) => user.id == id);

        if (userIndex < 0) {
            return;
        }

        const deletedUser = this._users.splice(userIndex, 1);
        return deletedUser[0];
    }

    public list(): User[] {
        return this._users as User[];
    }

    public get(_: any, { id }: IdParam): User | undefined {
        return this._users.find((user) => user.id == id);
    }

    public loggedUsers() {
        return this._users.filter(({ authenticated }) => authenticated);
    }
}
