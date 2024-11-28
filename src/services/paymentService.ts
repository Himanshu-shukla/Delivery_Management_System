import Driver from '../models/driverModel';
import Order from '../models/orderModel';

export async function calculatePayment(driverId: string): Promise<number> {
  const driver = await Driver.findOne({driverId}).populate({
    path: 'orders',
    model: 'Order',
    select: 'orderStatus', 
  });

  if (!driver) {
    throw new Error('Driver not found');
  }

  const ordersCompleted = (driver.orders as any[]).filter(order => order.orderStatus === 'delivered').length;
  const timeSpent = driver.timeSpentOnline || 0;
  const distanceTraveled = driver.distanceTraveled || 0;

  const payment = ordersCompleted * 10 + timeSpent * 2 + distanceTraveled * 0.5;
  return payment;
}
