import { Router } from "express";
import { OrderController } from "./order.controller";
import auth from "../../middleware/auth";
import { UserRole } from "../user/user.interface";

const router = Router();

// Define routes
router.get(
  "/my-shop-orders",
  auth(UserRole.TENANT),
  OrderController.getMyShopOrders
);

router.get("/my-orders", auth(UserRole.TENANT), OrderController.getMyOrders);

router.get("/:orderId", auth(UserRole.TENANT), OrderController.getOrderDetails);

router.post("/", auth(UserRole.TENANT), OrderController.createOrder);

router.patch(
  "/:orderId/status",
  auth(UserRole.TENANT),
  OrderController.changeOrderStatus
);

export const OrderRoutes = router;
