import { Request, Response } from "express";
import Driver from "../models/driverModel";

export async function createDriver(req: Request, res: Response): Promise<void> {
  const driver = new Driver(req.body);
  await driver.save();
  res.status(201).json(driver);
}

export async function getDrivers(req: Request, res: Response): Promise<void> {
  try {
    const drivers = await Driver.find();
    res.status(200).json(drivers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching drivers.' });
  }
}

export async function getDriver(req: Request, res: Response): Promise<void> {
  const driverId = req.params.driverId;
  try {
    const driver = await Driver.findOne({ driverId });
    if (!driver) {
      res.status(404).json({ message: 'Driver not found.' });
      return;
    }
    res.status(200).json(driver);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching driver.' });
  }
}

export async function updateDriver(req: Request, res: Response): Promise<void> {
  const driverId = req.params.driverId;
  try {
    const updatedDriver = await Driver.findOneAndUpdate({ driverId }, req.body, { new: true });
    if (!updatedDriver) {
      res.status(404).json({ message: 'Driver not found.' });
      return;
    }
    res.status(200).json(updatedDriver);
  } catch (error) {
    res.status(500).json({ message: 'Error updating driver.' });
  }
}

export async function deleteDriver(req: Request, res: Response): Promise<void> {
  const driverId = req.params.driverId;
  try {
    const deletedDriver = await Driver.findOneAndDelete({ driverId });
    if (!deletedDriver) {
      res.status(404).json({ message: 'Driver not found.' });
      return;
    }
    res.status(200).json({ message: 'Driver deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting driver.' });
  }
}