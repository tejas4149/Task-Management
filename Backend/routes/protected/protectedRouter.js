import { Router } from "express";
import AdminUserRouter from "./Admin/AdminUserRouter.js";
import { isSuperAdminMiddleware } from "../../utils/JwtToken.js";
import UserRouter from "./User/UserRouter.js";

const protectedRouter = Router();

//api

//route for admin
protectedRouter.use("/admin", isSuperAdminMiddleware, AdminUserRouter);

// route for user
protectedRouter.use("/user", UserRouter);

export default protectedRouter;
