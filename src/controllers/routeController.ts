import Route from '../models/routeModel';
import Order from '../models/orderModel';
import { Request, Response } from 'express';

export async function createRoute(req: Request, res: Response): Promise<void> {
  const { orderId, steps, status } = req.body;
  const order = await Order.findById(orderId);
  if (!order) {
    res.status(404).json({ message: 'Order not found' });
    return;
  }
  const route = new Route({ orderId, steps, status });
  await route.save();
  res.status(201).json(route);
}

export async function getRoutes(req: Request, res: Response): Promise<void> {
  try {
    const routes = await Route.find();
    res.status(200).json(routes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching routes.' });
  }
}

export async function getRoute(req: Request, res: Response): Promise<void> {
  const routeId = req.params.routeId;
  try {
    const route = await Route.findOne({ routeId });
    if (!route) {
      res.status(404).json({ message: 'Route not found.' });
      return;
    }
    res.status(200).json(route);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching route.' });
  }
}

export async function updateRoute(req: Request, res: Response): Promise<void> {
  const routeId = req.params.routeId;
  try {
    const updatedRoute = await Route.findOneAndUpdate({ routeId }, req.body, { new: true });
    if (!updatedRoute) {
      res.status(404).json({ message: 'Route not found.' });
      return;
    }
    res.status(200).json(updatedRoute);
  } catch (error) {
    res.status(500).json({ message: 'Error updating route.' });
  }
}

export async function deleteRoute(req: Request, res: Response): Promise<void> {
  const routeId = req.params.routeId;
  try {
    const deletedRoute = await Route.findOneAndDelete({ routeId });
    if (!deletedRoute) {
      res.status(404).json({ message: 'Route not found.' });
      return;
    }
    res.status(200).json({ message: 'Route deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting route.' });
  }
}