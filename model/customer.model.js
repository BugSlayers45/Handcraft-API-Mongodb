import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true,
        trim: true
    },
    customerEmail: {
        type: String,
        required: true,
        trim: true
    },
    customerPassword: {
        type: String,
        required: true
    },
    customerContact: {
        type: String,
        required: true
    }
});

export const Customer = mongoose.model("customer", customerSchema);
