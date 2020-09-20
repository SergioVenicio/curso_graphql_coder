import Product from "../../models/Product";
import Resolver, { IdParam } from "../interface";

export default class productResolver implements Resolver<Product> {
    private _id: number = 0;
    private _products: Product[];

    constructor(products: Product[] = []) {
        this._products = products;
    }

    public add({ name, price, discount }: Omit<Product, "id">): Product {
        const productAlreadyExists = this._products.find(
            (prod) => prod.name === name
        );

        if (productAlreadyExists) {
            throw new Error("This product alreadu exists!");
        }

        this._id++;

        const parsedID = new String(this._id);
        const newProduct = new Product(parsedID, name, price, discount);

        this._products.push(newProduct);
        return newProduct;
    }

    public update({ id, name, price, discount }: Product): Product | undefined {
        const productIndex = this._products.findIndex(
            (product) => product.id == id
        );

        if (productIndex < 0) {
            return;
        }

        Object.assign(this._products[productIndex], { name, price, discount });
        return this._products[productIndex];
    }

    public delete({ id }: IdParam): Product | undefined {
        const productIndex = this._products.findIndex(
            (product) => product.id == id
        );

        if (productIndex < 0) {
            return;
        }

        const deletedProduct = this._products.splice(productIndex, 1);
        return deletedProduct[0];
    }

    public get(_: any, { id }: IdParam): Product | undefined {
        return this._products.find((product) => product.id == id);
    }

    public list(): Product[] {
        return this._products;
    }

    public calcDiscount(product: Product): Number {
        return product?.calcDiscount();
    }
}
