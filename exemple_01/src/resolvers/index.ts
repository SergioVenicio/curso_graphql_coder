import UserResolver from "./User";
import ProductResolver from "./Product";
import ProfileResolver from "./Profile";
import Product from "../models/Product";
import Profile from "../models/Profile";

const userResolver = new UserResolver();
const productResolver = new ProductResolver();
const profileResolver = new ProfileResolver();

profileResolver.add({ id: "1", name: "ADM" });
profileResolver.add({ id: "2", name: "USER" });

userResolver.add({
    id: "1",
    name: "Test",
    email: "test@test.com",
    age: 18,
    authenticated: true,
    profile: profileResolver.get(undefined, { id: "1" }) as Profile,
});
userResolver.add({
    id: "2",
    name: "Test 2",
    email: "test2@test.com",
    age: 17,
    authenticated: false,
    profile: profileResolver.get(undefined, { id: "2" }) as Profile,
});

productResolver.add({
    id: "1",
    name: "Hamburguer",
    price: Number(20.0),
    discount: Number(0.0),
});
productResolver.add({
    id: "2",
    name: "Coca-cola",
    price: 10.0,
    discount: 0.2,
});

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
    Product: {
        calcDiscount: (product: Product, _: any) =>
            productResolver.calcDiscount(product),
    },
};
export default resolvers;
