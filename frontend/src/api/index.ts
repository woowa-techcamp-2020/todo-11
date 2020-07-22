const baseUrl = "http://localhost:3000";

export default {
    async login(email: string, password: string) {
        const res = await fetch(`${baseUrl}/login`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
        return res;
    },

    async signup(email: string, password: string) {
        const res = await fetch(`${baseUrl}/signup`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
        return res;
    },
};
