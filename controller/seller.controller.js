import dbConfig from "../db/dbConfig.js";
import { Seller } from "../model/seller.model.js";
import { Product } from "../model/product.model.js";
import bcrypt from "bcryptjs";

export const SingUp = async (request, response, next) => {
    try {
        let saltkey = await bcrypt.genSalt(10);
        let encryptedPassword = await bcrypt.hash(request.body.sellerPassword, saltkey);
        request.body.sellerPassword = encryptedPassword;

        let seller = await Seller.create(request.body)
        return response.status(200).json({ message: "SignUp Successful", seller: seller, status: true });

    } catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internal Server Error", status: false });
    }
}

export const SignIn = async (request, response, next) => {
    try {
        let responseType = false;
        let seller = await Seller.findOne({ sellerEmail: request.body.sellerEmail });

        responseType = seller ? true : false;

        let status = responseType ? await bcrypt.compare(request.body.sellerPassword, seller.sellerPassword) : false;
        console.log(status);
        seller = seller?.toObject();
        delete seller?.sellerPassword;
        return status ? response.status(200).json({ message: "SignIn Successful", status: true }) : response.status(400).json({ error: "Bad request", status: false });
    } catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internal Server error", status: false });
    }
}

export const Save = async (request, response, next) => {
    try {
        await Product.create(request.body.products)

        return response.status(200).json({ message: "Product saved...", status: true });
    } catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internal Server Error", status: false });
    }
}

export const productList = async (request, response, next) => {
    Product.find({ sellerId: request.params.sellerId })
        .then(result => {
            console.log(result);
            return response.status(200).json({ productsList: result, status: true })
        }).catch(err => {
            console.log(err);
            return response.status(500).json({ error: "INTERNAL SERVER ERROR", status: false })
        })
}



export const updateproducts = async (request, response, next) => {
    try {
        let result = await Product.findOneAndUpdate({ _id: request.params.id },
            {
                $set: {
                    title: request.body.title,
                    description: request.body.description,
                    price: request.body.price,
                    discountPercentage: request.body.discountPercentage,
                    rating: request.body.rating,
                    stock: request.body.stock,
                    brand: request.body.brand,
                    category: request.body.category,
                    thumbnail: request.body.thumbnail,
                    keyword: request.body.keyword,
                    sellerId: request.body.sellerId
                }
            })
        return response.status(200).json({ Update: result, status: true })
    } catch (err) {
        return response.status(500).json({ error: "INTERNAL SERVER ERROR", status: false })
    }
}

export const removeProduct = async (request, response, next) => {
    try {
        let product = await Product.find({ sellerId: request.params.sellerId })
        if (!product)
            return response.status(404).json({ error: "Requested resources not found", status: false });
        let status = await Product.deleteOne({ _id: request.body._id });
        return response.status(200).json({ message: "Product removed", status: true })

    } catch (err) {
        console.log(err);
        return response.status(500).json({ message: "Internal server error", status: false });
    }
}

