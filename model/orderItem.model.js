import mongoose from "mongoose";

const orderItemsSchema = new mongoose.Schema({
    quantity: {
        type: Number,
        default: 1,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
    }
})

export const OrderItems = mongoose.model("OrderItems", orderItemsSchema);