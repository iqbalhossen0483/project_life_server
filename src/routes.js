import { Router } from "express";
import authRoute from "./modules/auth/routes/auth.route.js";


const router = Router();

router.use("/auth", authRoute);

router.get("/", (req, res) => {
  res.send({
    projectName: "Backend API Server",
    projectDescription: "Backend API Server",
    path: "/api",
  });
});

export default router;
