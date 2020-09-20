import Profile from "../Profile";

export default class User {
    constructor(
        public id: String,
        public name: String,
        public email: String,
        public age: Number,
        public authenticated: Boolean,
        public profile: Profile
    ) {}
}
