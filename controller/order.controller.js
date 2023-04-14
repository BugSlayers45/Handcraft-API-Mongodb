import express, { response } from "express";
import mongoose from "mongoose";
import { OrderItems } from "../model/orderItem.model.js";
import { Customer } from "../model/customer.model.js";
import { Order } from "../model/order.model.js";


export const placeOrder = async (request, response, next) => {
    try {
        const orderIds = Promise.all(
            request.body.orderItems.map(async (orderItem) => {
                let newOrderItems = new OrderItems({
                    quantity: orderItem.quantity,
                    product: orderItem.product
                });
                await newOrderItems.save();
                return newOrderItems._id;
            })
        )
        const orderIdArray = await orderIds;
        const billAmount = await Promise.all(
            orderIdArray.map(async (id) => {
                const item = await OrderItems.findById(id).populate("product", "price")
                return item.product.price * item.quantity;
            })

        )
        const sumPrice = billAmount.reduce((a, b) => {
            a + b, 0
        })
        const order = new Order({
            customerId: request.body._id,
            deliveryAddress: request.body.deliveryAddress,
            billAmount: sumPrice,
            contactNumber: request.body.contactNumber,
            contactPerson: request.body.contactPerson,
            orderItem: orderIdArray
        })
        await order.save()
        return response.status(200).json({ orderdetail: order, status: true })
    }
    catch (err) {
        console.log(err)
        return response.status(500).json({ error: err })

    }


}
export const orderDetails = async (request, response, next) => {
    try {
        const order = await Order.find({ customerId: request.body.customerId }).populate({
            path: "orderItem",
            populate: { path: "product", populate: "category" }
        })
        if (!order)
            return response.status(401).json({ message: "NO order Found" });
        return response.status(200).json({ order, status: true })
    }
    catch (err) {
        console.log(err)
        return response.status(500).json({ error: "INTERNAL SERVER ERROR" })
    }


}

export const updateOrder = async (request, response, next) => {
    try {
        let order = await Order.findById(request.params.orderId)
        if (!order)
            return response.status(401).json({ message: "Order ID nor found" })
        if (order.status == "shipped")
            return response.status(200).json({ status: "Order has already shipped" })
        order = await Order.findByIdAndUpdate(
            request.params.orderId,
            {
                status: request.body.status
            }, { new: true }
        )
        return response.status(200).json({ Order: order })
    }
    catch (err) {
        console.log(err)
        return response.status(500).json({ error: "Internal Server Error" })
    }
}