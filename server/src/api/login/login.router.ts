import express, { NextFunction } from "express";
import { loginController, test } from "./login.controller";

const router = express.Router();

router.get("/", (req, res, next) => {
    res.send("login!!");
});
router.post("/", loginController);
router.post("/test", test);

export default router;
