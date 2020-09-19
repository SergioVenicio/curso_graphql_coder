import Product from "../../models/Product";
import Resolver, { IdParam } from "../interface";

export default class productResolver implements Resolver<Product> {
    private _products: Product[];

    constructor(products: Product[] = []) {
        this._products = products;
    }

    public add({ id, name, price, discount }: Product): void {
        const newProduct = new Product(id, name, price, discount);
        this._products.push(newProduct);
    }

    public get(_: any, { id }: IdParam): Product | undefined {
        return this._products.find((product) => product.id === id);
    }

    public list(): Product[] {
        return this._products;
    }

    public calcDiscount(product: Product): Number {
        return product?.calcDiscount();
    }
}
