import express, { NextFunction } from 'express';
import {loginController} from './login.controller';

const router = express.Router();

router.get('/', (req, res, next) => {
    res.send("login!!");
});
router.post('/', loginController);



export default router;