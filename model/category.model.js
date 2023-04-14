import mongoose from "mongoose";

const categoryScheme = new mongoose.Schema({
    categoryName: {
        type: String
    }
});

export const Category = mongoose.model("category", categoryScheme);