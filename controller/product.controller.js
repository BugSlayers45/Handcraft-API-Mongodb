import { Product } from "../model/product.model.js";
import dbConfig from "../db/dbConfig.js";



export const list = async (request, response, next) => {
    try {
        let product = await Product.find()
        return response.status(200).json({ message: "Product List.....", product: product, status: true });
    } catch (err) {
        return reponse.status(500).json({ error: "Internal Server Error", status: false });
    }
}


export const getProductById = (request, response, next) => {
    Product.findById(request.params.id)
        .then(result => {
            return response.status(200).json({ message: "Product list by PK ...", product: result, status: true });
        }).catch(err => {
            return response.status(500).json({ error: "Internal Server Error", status: false });
        })
}

export const getProductByCategory = (request, response, next) => {
    Product.find({ categoryId: request.params.categoryId })
        .then(result => {
            return response.status(200).json({ message: "Product list by categoryID...", product: result, status: true });
        }).catch(err => {
            console.log(err);
            return response.status(500).json({ error: "Internal Server Error", status: false });
        })
}



export const search = async (request, response, next) => {
    try {
        let searchResult = await Product.find({
            $or: [{ title: { $regex: request.params.keyword, $options: "i" } },
            { keyword: { $regex: request.params.keyword, $options: "i" } },
            { description: { $regex: request.params.keyword, $options: "i" } }]
        })
        if (searchResult.length > 0)
            return response.status(200).json({ Product: searchResult, status: true })
        else
            return response.status(401).json({ result: "NO result found", status: false })
    }
    catch (err) {
        console.log(err)
        return response.status(500).json({ error: err, status: false })
    }
}



