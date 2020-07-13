import express from 'express';
import login from './login';
import signup from './signup';
import test from './test';

const router = express.Router();

router.use("/login", login.api);

router.use("/test", test.api);
router.use("/signup", signup.api);

router.get("/", (req, res, next)=> {
    res.send("hello world!!");
});

export default router;
