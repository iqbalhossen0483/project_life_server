import { Router } from "express";
import { changePassword, createUser, login, getUserInfo } from "../controllers/auth.controller.js";
import validationMiddleware from "../../../utils/middlewares/validationMiddleware.js";
import isAuthenticated from "../../../utils/middlewares/isAuthenticate.js";
import { createUserValidator } from "../validators/auth.validators.js";
const router = Router();

router.post("/register", validationMiddleware(createUserValidator), isAuthenticated, createUser);
router.post("/login", login);
router.post("/change-password", isAuthenticated, changePassword);
router.get("/me", isAuthenticated, getUserInfo);

export default router;