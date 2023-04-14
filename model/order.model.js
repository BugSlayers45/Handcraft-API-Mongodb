import mongoose from "mongoose";


const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    date: {
        type: Date,
        default: Date.now,
    },
    deliveryAddress: String,
    contactNumber: Number,
    contactPerson: String,
    billAmount:
    {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: "pending"
    },
    paymentMode: String,
    orderItem:
        [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "OrderItems",
                required: true,
            }
        ]
})
export const Order = mongoose.model("Order", OrderSchema)