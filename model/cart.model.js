import mongoose, { mongo } from "mongoose";

const cartSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customer"
    },
    cartItem: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product"
        },
        cartId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "cart"
        }
    }]
})

export const Cart = mongoose.model("cart", cartSchema);