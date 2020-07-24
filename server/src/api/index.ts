import express from "express";
import login from "./login";
import signup from "./signup";
import todolist from "./todolist";
import path from "path";

const router = express.Router();
const PUBLIC_PATH = path.join(__dirname, "..", "public");

router.get("/", (req, res, next) => {
    res.sendFile(path.join(PUBLIC_PATH, "index.html"));
});
router.use("/login", login.api);
router.use("/signup", signup.api);
router.use("/todolist", todolist.api);

export default router;
