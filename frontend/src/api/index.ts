import { CardModel, ColumnModel } from "../model";
import AddCardArea from "../components/columnArea/columnHeader/addCardArea/addCardArea";

const baseUrl = "http://localhost:3000";

export default {
    async login(email: string, password: string) {
        return await fetch(`${baseUrl}/login`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
    },

    async signup(email: string, password: string) {
        return await fetch(`${baseUrl}/signup`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
    },

    async editCardContent(card: CardModel) {
        return await fetch(`${baseUrl}/todolist/card`, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(card),
        });
    },
    async editColumnTitle(column: ColumnModel) {
        return await fetch(`${baseUrl}/todolist/column`, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(column),
        });
    },
    async addCard(columnNo: number, memberNo: number,  content: string) {
        return await fetch(`${baseUrl}/todolist/card`, {
            method: "post",
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                memberNo,
                columnNo,
                content,
            }),
        });
    },
    async deleteCard(card: CardModel) {
        return await fetch(`${baseUrl}/todolist/card`, {
            method: "delete",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(card),
        });
    },
    async deleteColumn(column: ColumnModel) {
        return await fetch(`${baseUrl}/todolist/column`, {
            method: "delete",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(column),
        });
    },
};
