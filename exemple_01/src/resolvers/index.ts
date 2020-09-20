import UserResolver from "./User";
import ProductResolver from "./Product";
import ProfileResolver from "./Profile";
import Product from "../models/Product";
import Profile from "../models/Profile";

const userResolver = new UserResolver();
const productResolver = new ProductResolver();
const profileResolver = new ProfileResolver();

profileResolver.add({ name: "ADM" });
profileResolver.add({ name: "USER" });

userResolver.add({
    name: "Test",
    email: "test@test.com",
    age: 18,
    authenticated: true,
    profile: profileResolver.get(undefined, { id: "1" }) as Profile,
});
userResolver.add({
    name: "Test 2",
    email: "test2@test.com",
    age: 17,
    authenticated: false,
    profile: profileResolver.get(undefined, { id: "2" }) as Profile,
});

productResolver.add({
    name: "Hamburguer",
    price: Number(20.0),
    discount: Number(0.0),
});
productResolver.add({
    name: "Coca-cola",
    price: 10.0,
    discount: 0.2,
});

interface newUserParams {
    name: String;
    email: String;
    age: Number;
    profile_id: String;
}
interface updateUserParams extends newUserParams {
    id: String;
}

interface newProfileParams {
    name: String;
}
interface deleteParams {
    id: String;
}

interface updateProfileParams extends newProfileParams, deleteParams {}

interface newProductParams {
    name: String;
    price: Number;
    discount: Number;
}

const resolvers = {
    Query: {
        user: (_: any, args: any) => userResolver.get(_, args),
        users: () => userResolver.list(),
        logged_users: () => userResolver.loggedUsers(),
        product: (_: any, args: any) => productResolver.get(_, args),
        products: () => productResolver.list(),
        profile: (_: any, args: any) => profileResolver.get(_, args),
        profiles: () => profileResolver.list(),
    },
    Mutation: {
        // User
        newUser: (_: any, { name, email, age, profile_id }: newUserParams) => {
            const profile = profileResolver.get(undefined, {
                id: profile_id,
            }) as Profile;

            return userResolver.add({
                name,
                email,
                age,
                authenticated: false,
                profile,
            });
        },
        updateUser: (
            _: any,
            { id, name, email, age, profile_id }: updateUserParams
        ) => {
            const profile = profileResolver.get(undefined, {
                id: profile_id,
            }) as Profile;
            return userResolver.update({
                id,
                name,
                email,
                age,
                authenticated: false,
                profile,
            });
        },
        deleteUser: (_: any, args: any) => userResolver.delete(args),

        // Profile
        newProfile: (_: any, { name }: newProfileParams) =>
            profileResolver.add({ name }),
        updateProfile: (_: any, { id, name }: updateProfileParams) =>
            profileResolver.update({ id, name }),
        deleteProfile: (_: any, { id }: deleteParams) =>
            profileResolver.delete({ id }),

        // Product
        newProduct: (_: any, { name, price, discount }: newProductParams) =>
            productResolver.add({ name, price, discount } as Product),
        updateProduct: (_: any, { id, name, price, discount }: Product) =>
            productResolver.update({ id, name, price, discount } as Product),
        deleteProduct: (_: any, { id }: deleteParams) =>
            productResolver.delete({ id }),
    },
    Product: {
        calcDiscount: (product: Product, _: any) =>
            productResolver.calcDiscount(product),
    },
};
export default resolvers;
