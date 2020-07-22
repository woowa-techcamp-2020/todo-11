import { Router, Request, Response, NextFunction } from "express";
import todoController from "./todolist.controller";

const router = Router();

router.post("/card", todoController.addCard);
router.put("/card", todoController.updateCard);
router.delete("/card", todoController.deleteCard);

export default router;
