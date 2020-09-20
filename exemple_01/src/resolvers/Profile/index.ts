import Profile from "../../models/Profile";
import Resolver, { IdParam } from "../interface";

export default class ProfileResolver implements Resolver<Profile> {
    private _id: number = 0;
    private _profiles: Profile[] = [];

    constructor(profiles: Profile[] = []) {
        this._profiles = profiles;
    }

    public add({ name }: Omit<Profile, "id">): Profile {
        const profileAlreadyExists = this._profiles.find(
            (profile) => profile.name === name
        );

        if (profileAlreadyExists) {
            throw new Error("This profile already exists!");
        }

        this._id++;

        const parsedID = new String(this._id);
        const newProfile = new Profile(parsedID, name);

        this._profiles.push(newProfile);
        return newProfile;
    }

    public update({ id, name }: Profile): Profile | undefined {
        const profileIndex = this._profiles.findIndex(
            (profile) => profile.id == id
        );

        if (profileIndex < 0) {
            return;
        }

        Object.assign(this._profiles[profileIndex], { name });
        return this._profiles[profileIndex];
    }

    public delete({ id }: IdParam): Profile | undefined {
        const profileIndex = this._profiles.findIndex(
            (profile) => profile.id == id
        );

        if (profileIndex < 0) {
            return;
        }

        const deletedProfile = this._profiles.splice(profileIndex, 1);
        return deletedProfile[0];
    }

    public list() {
        return this._profiles;
    }

    public get(_: any, { id }: IdParam) {
        return this._profiles.find((profile) => profile.id == id);
    }
}
