import express from 'express';
import login from './login';
import signup from './signup';

const router = express.Router();

router.use("/login", login.api);
router.use("/signup", signup.api);

export default router;
