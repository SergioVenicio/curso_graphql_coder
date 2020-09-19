export default class Product {
    constructor(
        public id: String,
        public name: String,
        public price: Number,
        public discount: Number
    ) {}

    public calcDiscount(): Number {
        const discount_value = Number(this.price) * Number(this.discount);
        return Number(this.price) - discount_value;
    }
}
