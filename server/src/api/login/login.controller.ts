import {checkMember} from '../../service/checker';
import {Request, Response, NextFunction} from 'express';


async function loginController(req: Request, res: Response, next: NextFunction) {
    const {email, password} = req.body;
    
    if(!email || !password) {
        res.status(400).send();
    }
    else if(await checkMember(email, password)) {
        res.status(201).send();
    }
    else {
        res.status(400).send();
    }
}

export {loginController}