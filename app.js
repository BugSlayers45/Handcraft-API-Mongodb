import express from "express";
import bodyParser from "body-parser";
import CustomerRouter from "./routes/customer.route.js";
import ProductRouter from "./routes/product.route.js";
import SellerRouter from "./routes/seller.route.js";
import CategoryRouter from "./routes/category.route.js";
import AdminRouter from "./routes/admin.route.js";
import OrderRouter from "./routes/order.route.js";
import CartRouter from "./routes/cart.route.js";
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/customer", CustomerRouter);
app.use("/seller", SellerRouter);
app.use("/category", CategoryRouter);
app.use("/product", ProductRouter);
app.use("/admin", AdminRouter);
app.use("/order", OrderRouter);
app.use("/cart", CartRouter);


app.listen(6000, () => {
    console.log("Server started....");
})
