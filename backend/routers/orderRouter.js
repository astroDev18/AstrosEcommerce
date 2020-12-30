import express from 'express';
import Order from "../models/orderModel.js";
import auth from "../middleware/auth.js";

const orderRouter = express.Router();

orderRouter.post('/', auth, async(req, res) => {
    try {
        // console.log(req.body);

        if (req.body.orderItems.length === 0) {
            res.status(400).send({ message: 'Cart is empty' });
        } else {
            const order = new Order({
                orderItems: req.body.orderItems,
                shippingAddress: req.body.shippingAddress,
                paymentMethod: req.body.paymentMethod,
                itemsPrice: req.body.itemsPrice,
                shippingPrice: req.body.shippingPrice,
                taxPrice: req.body.taxPrice,
                totalPrice: req.body.totalPrice,
                user: req.user._id
            })
            const createdOrder = await order.save();
            res.status(201).send({ message: 'New Order Created', order: createdOrder })
        }
    } catch (e) {
        console.error(e);
    }
})

orderRouter.get('/:id', auth, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            res.send(order);
        } else {
            res.status(404).send({message: "Order not found"});
        }
    } catch (e) {
        res.status(404).send({message: "Sorry, the order you requested was not found"})
    }
})

export default orderRouter;