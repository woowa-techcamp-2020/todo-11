import { Router, Request, Response, NextFunction } from "express";
import {
    addCard as addCardDB,
    getMaxCardOrder,
    getCard,
    getOneData,
    updateOne,
    query,
} from "../../repository/mysql";

async function addCard(req: Request, res: Response, next: NextFunction) {
    try {
        let { columnNo, content, memberNo } = req.body;
        const nextOrderNo = (await getMaxCardOrder(columnNo)) + 1;
        if (memberNo === undefined) memberNo = req.session!.memberNo;

        const addedCardNo = await addCardDB(content, nextOrderNo, memberNo, columnNo);
        const addedCardInfo = await getCard(addedCardNo);

        if (addedCardInfo === null) {
            res.status(400).send();
        } else {
            res.status(201).send(addedCardInfo);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
}

async function updateCard(req: Request, res: Response, next: NextFunction) {
    try {
        const { content, cardNo, orderNo, columnNo } = req.body;
        const values = [content, orderNo, columnNo, cardNo];
        const isUpdated = await updateOne(query.UPDATE_CARD, values);

        res.status(isUpdated ? 200 : 400).send();
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
}

async function deleteCard(req: Request, res: Response, next: NextFunction) {
    try {
        const { cardNo } = req.body;
        const isDeleted = await updateOne(query.DELETE_CARD, [cardNo]);

        res.status(isDeleted ? 200 : 400).send();
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
}

export default {
    addCard,
    updateCard,
    deleteCard,
};
