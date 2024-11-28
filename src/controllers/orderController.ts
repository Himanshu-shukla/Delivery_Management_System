import { Request, Response } from 'express';
import Order from '../models/orderModel';
import checkRole from '../middleware/authMiddleware';

export const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const order = new Order(req.body);

    await order.save();
    console.log("saved", order);

    res.status(201).json(order);
  } catch (error) {
    console.error("this is error:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findOne({ orderId });
    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderId = req.params.orderId;
    const updatedOrder = await Order.findOneAndUpdate({ orderId }, req.body, { new: true });
    if (!updatedOrder) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderId = req.params.orderId;
    const deletedOrder = await Order.findOneAndDelete({ orderId });
    if (!deletedOrder) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};