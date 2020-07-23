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
    async deleteCard(cardNo: number) {
        return await fetch(`${baseUrl}/todolist/card`, {
            method: "delete",
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                cardNo,
            }),
        });
    }
    
    // async editColumnTitle(column: ColumnModel) {},
};
