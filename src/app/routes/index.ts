import { Router } from "express";
import { UserRoutes } from "../modules/user/user.routes";
import { AuthRoutes } from "../modules/auth/auth.routes";

import { ProductRoutes } from "../modules/product/product.routes";
import { OrderRoutes } from "../modules/order/order.routes";

import { ShopRoutes } from "../modules/shop/shop.routes";

import { MetaRoutes } from "../modules/meta/meta.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/shop",
    route: ShopRoutes,
  },

  {
    path: "/product",
    route: ProductRoutes,
  },

  {
    path: "/order",
    route: OrderRoutes,
  },

  {
    path: "/meta",
    route: MetaRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
