import Profile from "../Profile";

export default class User {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public age: Number,
        public authenticated: Boolean,
        public profile: Profile
    ) {}
}
