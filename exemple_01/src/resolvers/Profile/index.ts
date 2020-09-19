import Profile from "../../models/Profile";
import Resolver, { IdParam } from "../interface";

export default class ProfileResolver implements Resolver<Profile> {
    private _profiles: Profile[] = [];

    constructor(profiles: Profile[] = []) {
        this._profiles = profiles;
    }

    public add({ id, name }: Profile) {
        this._profiles.push({ id, name });
    }

    public list() {
        return this._profiles;
    }

    public get(_: any, { id }: IdParam) {
        return this._profiles.find((profile) => profile.id === id);
    }
}
