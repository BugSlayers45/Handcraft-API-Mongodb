import express, { request, response } from "express";
import mongoose from "mongoose";
import { Cart } from "../model/cart.model.js";
import dbConfig from "../db/dbConfig.js";
import { Product } from "../model/product.model.js";


export const addToCart = async (request, response, next) => {
    try {
        let cart = await Cart.findOne({ customerId: request.body.customerId })
        if (cart) {
            let cartItemList = cart.cartItem;
            let index = cartItemList.findIndex((item) => item.productId == request.body.productId)
            if (index != -1)
                return response.status(200).json({ message: "Product is already in cart", status: true })
            else {
                cart.cartItem.push({ productId: request.body.productId });
                let saveedCart = await cart.save();
                return response.status(200).json({ message: "Product Sucess fully Added", status: true })
            }
        }
        else {
            let cart = new Cart();
            cart.customerId = request.body.customerId;
            cart.cartItem.push({ productId: request.body.productId })
            let saveedCart = await cart.save();
            return response.status(200).json({ message: "item added sucessfully", status: true })
        }
    } catch (err) {
        console.log(err)
        return response.status(500).json({ error: "INTERNAL SERVER ERROR", status: false })
    }
}


export const viewCartItems = async (request, response, next) => {
    try {
        let cartItems = await Cart.findOne({ customerId: request.body.customerId }).populate("cartItem.productId")

        return response.status(200).json({ cart: cartItems, status: true })

    }
    catch (err) {
        console.log(err)
        return response.status(500).json({ error: "INTERNAL SERVER ERROR", status: false })
    }
}