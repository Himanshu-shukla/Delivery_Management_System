import express, {
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from "express";
import { connectDB } from "./db";
import checkRole from "./middleware/authMiddleware";
import orderRoutes from "./routes/orderRoutes";
import driverRoutes from "./routes/driverRoutes";
import routeRoutes from "./routes/routeRoutes";
import authRoutes from "./routes/authRoutes";
import { calculatePayment } from "./services/paymentService";

const app = express();
const PORT = 3000;

app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use(
  "/api/orders",
  checkRole(["Admin", "Driver"]) as RequestHandler,
  orderRoutes
);
app.use("/api/drivers", checkRole(["Admin"]) as RequestHandler, driverRoutes);
app.use(
  "/api/routes",
  checkRole(["Admin", "Driver"]) as RequestHandler,
  routeRoutes
);

// Middleware function to calculate payment
const calculatePaymentMiddleware: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const driverId = req.params.driverId;
    const paymentAmount = await calculatePayment(driverId);
    res.status(200).json({ paymentAmount });
  } catch (error) {
    next(error);
  }
};

app.use(
  "/payment/:driverId",
  checkRole(["Admin", "Driver"]) as RequestHandler,
  calculatePaymentMiddleware
);

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "Server is up and running" });
});

// Global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
