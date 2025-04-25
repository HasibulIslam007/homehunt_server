import { Router } from "express";
import auth from "../../middleware/auth";
import { UserRole } from "../user/user.interface";
import { ShopController } from "./shop.controller";
import { parseBody } from "../../middleware/bodyParser";
import { multerUpload } from "../../config/multer.config";
import validateRequest from "../../middleware/validateRequest";
import { ShopValidation } from "./shop.validation";

const router = Router();

router.get("/my-shop", auth(UserRole.TENANT), ShopController.getMyShop);

router.post(
  "/",
  auth(UserRole.TENANT),
  multerUpload.single("logo"),
  parseBody,
  validateRequest(ShopValidation.createShopValidation),
  ShopController.createShop
);

export const ShopRoutes = router;
