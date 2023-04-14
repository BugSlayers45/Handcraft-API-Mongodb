import dbConfig from "../db/dbConfig.js";
import { Customer } from "../model/customer.model.js";
import bcrypt from "bcryptjs";

export const SignIn = async (request, response, next) => {
    try {
        let responseType = false;
        let customer = await Customer.findOne({ customerEmail: request.body.customerEmail });

        responseType = customer ? true : false;

        let status = responseType ? await bcrypt.compare(request.body.customerPassword, customer.customerPassword) : false;
        console.log(status);
        customer = customer?.toObject();
        delete customer?.customerPassword;
        return status ? response.status(200).json({ message: "SignIn Successful", status: true }) : response.status(400).json({ error: "Bad request", status: false });
    } catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internal Server error", status: false });
    }
}

export const SingUp = async (request, response, next) => {
    try {
        let saltkey = await bcrypt.genSalt(10);
        let encryptedPassword = await bcrypt.hash(request.body.customerPassword, saltkey);
        request.body.customerPassword = encryptedPassword;

        let customer = await Customer.create(request.body)
        return response.status(200).json({ message: "SignUp Successful", customer: customer, status: true });

    } catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internal Server Error", status: false });
    }
}

export const list = async (request, response, next) => {
    try {
        let data = await Customer.find().toArray()

        console.log(data);
        return response.status(200).json({ list: data, status: true })
    } catch (err) {
        console.log(err);
        return response.status(500).json({ status: false, error: "Internal Server Error" });
    }
}







