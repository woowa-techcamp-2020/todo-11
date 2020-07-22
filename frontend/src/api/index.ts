import { CardModel, ColumnModel } from "../model";

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
    async editColumnTitle(column: ColumnModel) {},
};
